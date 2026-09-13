// @desc    Generate routes between two points
// @route   POST /api/routes/generate
const generateRoutes = async (req, res) => {
  try {
    const { from, to } = req.body;
    if (!from || !to) return res.status(400).json({ success: false, message: 'From and To locations are required.' });

    // Demo route generation
    const routes = [
      {
        routeType: 'Fastest',
        distance: '45 km',
        estimatedTime: '55 min',
        safetyScore: 72,
        trafficLevel: 'High',
        riskFactors: ['Heavy traffic on NH-48', 'Construction zone near toll'],
        color: '#f59e0b',
        waypoints: [
          { name: from, lat: 28.6139, lng: 77.2090 },
          { name: 'Midpoint', lat: 27.9000, lng: 77.5000 },
          { name: to, lat: 27.1767, lng: 78.0081 }
        ]
      },
      {
        routeType: 'Safest',
        distance: '58 km',
        estimatedTime: '75 min',
        safetyScore: 91,
        trafficLevel: 'Low',
        riskFactors: ['Minor road works near Mathura'],
        color: '#10b981',
        waypoints: [
          { name: from, lat: 28.6139, lng: 77.2090 },
          { name: 'Mathura', lat: 27.4924, lng: 77.6737 },
          { name: to, lat: 27.1767, lng: 78.0081 }
        ]
      },
      {
        routeType: 'Balanced',
        distance: '51 km',
        estimatedTime: '65 min',
        safetyScore: 85,
        trafficLevel: 'Moderate',
        riskFactors: ['Moderate traffic in city areas'],
        color: '#3b82f6',
        waypoints: [
          { name: from, lat: 28.6139, lng: 77.2090 },
          { name: 'Faridabad', lat: 28.4089, lng: 77.3178 },
          { name: to, lat: 27.1767, lng: 78.0081 }
        ]
      }
    ];

    res.json({ success: true, from, to, routes, isDemo: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to generate routes.' });
  }
};

// @desc    Get routes for a trip
// @route   GET /api/routes/:tripId
const getRoutes = async (req, res) => {
  res.json({ success: true, routes: [], message: 'No routes saved for this trip yet.' });
};

module.exports = { generateRoutes, getRoutes };
