const demoData = require('../utils/demoData');
const { asyncHandler } = require('../middleware/errorHandler');

const logs = [];

// POST /api/emergency/sos
exports.triggerSOS = asyncHandler(async (req, res) => {
  const { location, emergencyType, message } = req.body;
  const newLog = {
    _id: `sos_${Date.now()}`,
    userId: req.user?._id || 'demo_user',
    location: location || { lat: 28.6139, lng: 77.2090, address: 'Connaught Place, New Delhi' },
    timestamp: new Date().toISOString(),
    emergencyType: emergencyType || 'SOS',
    status: 'triggered',
    message: message || 'Emergency SOS triggered from mobile/web app.',
    contactedServices: ['Police Control Room (112)', 'Emergency Contact Shared'],
    isDemo: true
  };
  logs.unshift(newLog);

  res.json({
    success: true,
    message: 'SOS Signal received! Emergency contacts and local authorities notified (DEMO SIMULATION).',
    log: newLog,
    isDemo: true
  });
});

// GET /api/emergency/nearby
exports.getNearbyServices = asyncHandler(async (req, res) => {
  const { location } = req.query;
  const destKey = (location || 'delhi').toLowerCase().replace(/\s+/g, '');
  const services = demoData.emergencyServices;

  res.json({
    success: true,
    police: services.police.filter(s => s.location.toLowerCase() === destKey) || services.police,
    hospitals: services.hospitals.filter(s => s.location.toLowerCase() === destKey) || services.hospitals,
    fire: services.fire.filter(s => s.location.toLowerCase() === destKey) || services.fire,
    isDemo: true
  });
});

// GET /api/emergency/logs
exports.getEmergencyLogs = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    logs,
    isDemo: true
  });
});
