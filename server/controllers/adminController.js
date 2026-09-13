const demoData = require('../utils/demoData');
const { asyncHandler } = require('../middleware/errorHandler');

// GET /api/admin/stats
exports.getAdminStats = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    stats: {
      totalUsers: 142,
      activeTrips: 28,
      totalAlerts: demoData.alerts.length,
      averageSafetyScore: 78,
      riskDistribution: { Low: 65, Moderate: 25, High: 8, Critical: 2 }
    },
    users: [
      { id: 'u1', name: 'Rahul Sharma', email: 'demo@tourism.com', role: 'user', trips: 3, status: 'Active' },
      { id: 'u2', name: 'Priya Patel', email: 'priya@gmail.com', role: 'user', trips: 1, status: 'Active' },
      { id: 'u3', name: 'Amit Singh', email: 'amit@yahoo.com', role: 'user', trips: 4, status: 'Active' },
      { id: 'u4', name: 'Admin User', email: 'admin@tourism.com', role: 'admin', trips: 0, status: 'Active' }
    ],
    alerts: demoData.alerts,
    isDemo: true
  });
});
