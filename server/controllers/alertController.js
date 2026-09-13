const demoData = require('../utils/demoData');
const { asyncHandler } = require('../middleware/errorHandler');

let activeAlerts = [...demoData.alerts];

// GET /api/alerts
exports.getAlerts = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    alerts: activeAlerts,
    isDemo: true
  });
});

// PUT /api/alerts/:id/read
exports.markRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  activeAlerts = activeAlerts.map(a => a.id === id ? { ...a, read: true } : a);
  res.json({
    success: true,
    message: 'Alert marked as read.',
    isDemo: true
  });
});
