const demoData = require('../utils/demoData');
const { asyncHandler } = require('../middleware/errorHandler');

// POST /api/routes/generate
exports.generateRoutes = asyncHandler(async (req, res) => {
  const { origin, destination } = req.body;
  const destKey = (destination || 'delhi').toLowerCase().replace(/\s+/g, '');
  const destData = demoData.destinations[destKey] || demoData.destinations.delhi;

  res.json({
    success: true,
    origin: origin || 'Current Location',
    destination: destData.name,
    routes: destData.routes,
    isDemo: true
  });
});

// GET /api/routes/:tripId
exports.getRoutesByTrip = asyncHandler(async (req, res) => {
  const destData = demoData.destinations.delhi;
  res.json({
    success: true,
    routes: destData.routes,
    isDemo: true
  });
});
