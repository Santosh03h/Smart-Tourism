const Trip = require('../models/Trip');
const aiService = require('../services/aiService');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

// In-memory demo trips store
const demoTrips = {};

const getDemoTrips = (userId) => demoTrips[userId] || [
  { _id: 'trip001', userId, destination: 'Delhi', startDate: '2024-12-20', endDate: '2024-12-23', numberOfPeople: 2, budget: 15000, interests: ['Historical', 'Food'], transport: 'Train', status: 'completed', safetyScore: 68, estimatedCost: 12500, estimatedTravelTime: '4 days', createdAt: new Date(Date.now() - 7 * 86400000).toISOString(), isDemo: true },
  { _id: 'trip002', userId, destination: 'Agra', startDate: '2025-01-15', endDate: '2025-01-17', numberOfPeople: 1, budget: 8000, interests: ['Historical', 'Photography'], transport: 'Bus', status: 'completed', safetyScore: 74, estimatedCost: 6200, estimatedTravelTime: '3 days', createdAt: new Date(Date.now() - 3 * 86400000).toISOString(), isDemo: true },
  { _id: 'trip003', userId, destination: 'Jaipur', startDate: '2025-02-10', endDate: '2025-02-14', numberOfPeople: 4, budget: 40000, interests: ['Culture', 'Shopping', 'Food'], transport: 'Car', status: 'planned', safetyScore: 81, estimatedCost: 32000, estimatedTravelTime: '5 days', createdAt: new Date().toISOString(), isDemo: true },
];

// POST /api/trips
exports.createTrip = asyncHandler(async (req, res) => {
  const tripData = { ...req.body, userId: req.user._id };
  if (process.env.DEMO_MODE === 'true') {
    const newTrip = { _id: `trip_${Date.now()}`, ...tripData, status: 'planned', createdAt: new Date().toISOString(), isDemo: true };
    if (!demoTrips[req.user._id]) demoTrips[req.user._id] = [...getDemoTrips(req.user._id)];
    demoTrips[req.user._id].unshift(newTrip);
    return res.status(201).json({ success: true, trip: newTrip, demoMode: true });
  }
  const trip = await Trip.create(tripData);
  res.status(201).json({ success: true, trip });
});

// GET /api/trips
exports.getTrips = asyncHandler(async (req, res) => {
  if (process.env.DEMO_MODE === 'true') {
    return res.json({ success: true, trips: getDemoTrips(req.user._id), demoMode: true });
  }
  const trips = await Trip.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, trips });
});

// GET /api/trips/:id
exports.getTrip = asyncHandler(async (req, res) => {
  if (process.env.DEMO_MODE === 'true') {
    const trips = getDemoTrips(req.user._id);
    const trip = trips.find(t => t._id === req.params.id) || trips[0];
    return res.json({ success: true, trip, demoMode: true });
  }
  const trip = await Trip.findOne({ _id: req.params.id, userId: req.user._id });
  if (!trip) throw new AppError('Trip not found.', 404);
  res.json({ success: true, trip });
});

// PUT /api/trips/:id
exports.updateTrip = asyncHandler(async (req, res) => {
  if (process.env.DEMO_MODE === 'true') {
    const trips = getDemoTrips(req.user._id);
    const idx = trips.findIndex(t => t._id === req.params.id);
    if (idx !== -1) trips[idx] = { ...trips[idx], ...req.body };
    return res.json({ success: true, trip: trips[idx] || trips[0], demoMode: true });
  }
  const trip = await Trip.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, { new: true });
  if (!trip) throw new AppError('Trip not found.', 404);
  res.json({ success: true, trip });
});

// DELETE /api/trips/:id
exports.deleteTrip = asyncHandler(async (req, res) => {
  if (process.env.DEMO_MODE === 'true') {
    return res.json({ success: true, message: 'Trip deleted (demo mode).', demoMode: true });
  }
  await Trip.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  res.json({ success: true, message: 'Trip deleted.' });
});
