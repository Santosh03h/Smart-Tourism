const Trip = require('../models/Trip');
const aiService = require('../services/aiService');

// @desc    Create trip
// @route   POST /api/trips
const createTrip = async (req, res) => {
  try {
    const { destination, startDate, endDate, numberOfPeople, budget, interests, transport } = req.body;

    if (!destination || !startDate || !endDate || !budget) {
      return res.status(400).json({ success: false, message: 'Destination, dates and budget are required.' });
    }

    const trip = await Trip.create({
      userId: req.user._id,
      destination, startDate, endDate, numberOfPeople, budget, interests, transport
    });

    res.status(201).json({ success: true, message: 'Trip created successfully!', trip });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create trip.' });
  }
};

// @desc    Get all trips for user
// @route   GET /api/trips
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: trips.length, trips });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch trips.' });
  }
};

// @desc    Get single trip
// @route   GET /api/trips/:id
const getTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.user._id });
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found.' });
    res.json({ success: true, trip });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch trip.' });
  }
};

// @desc    Update trip
// @route   PUT /api/trips/:id
const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found.' });
    res.json({ success: true, message: 'Trip updated!', trip });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update trip.' });
  }
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found.' });
    res.json({ success: true, message: 'Trip deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete trip.' });
  }
};

module.exports = { createTrip, getTrips, getTrip, updateTrip, deleteTrip };
