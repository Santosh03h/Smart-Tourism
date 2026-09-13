const Alert = require('../models/Alert');

const DEMO_ALERTS = [
  {
    type: 'Weather',
    title: 'Heavy Rain Warning',
    description: 'Heavy rainfall expected in Delhi NCR region between 3 PM – 8 PM today.',
    severity: 'HIGH',
    location: 'Delhi NCR',
    recommendation: 'Carry an umbrella, avoid flooded roads, and prefer indoor activities in the evening.',
    isDemo: true
  },
  {
    type: 'Traffic',
    title: 'Road Closure on NH-48',
    description: 'National Highway 48 is partially closed due to construction work near Gurugram.',
    severity: 'MEDIUM',
    location: 'NH-48, Gurugram',
    recommendation: 'Use the alternative route via Faridabad or check Google Maps for live updates.',
    isDemo: true
  },
  {
    type: 'High-Risk Area',
    title: 'Crowded Zone Alert',
    description: 'Very high crowd density detected near Chandni Chowk due to weekend festival.',
    severity: 'MEDIUM',
    location: 'Chandni Chowk, Delhi',
    recommendation: 'Keep your belongings secure, avoid isolated lanes, and stay in groups.',
    isDemo: true
  },
  {
    type: 'General',
    title: 'Tourist Advisory — Taj Mahal',
    description: 'Expect longer queues at Taj Mahal on Saturdays. Online booking recommended.',
    severity: 'LOW',
    location: 'Agra, Uttar Pradesh',
    recommendation: 'Book tickets online at asi.payumoney.com to skip the queue.',
    isDemo: true
  }
];

const isConnected = () => require('mongoose').connection.readyState === 1 && process.env.DEMO_MODE !== 'true';

// @desc    Get alerts
// @route   GET /api/alerts
const getAlerts = async (req, res) => {
  try {
    let alerts = [];
    if (isConnected()) {
      try {
        alerts = await Alert.find({ $or: [{ userId: req.user?._id }, { userId: null }] }).sort({ createdAt: -1 });
      } catch (dbErr) {
        // DB error fallback
      }
    }

    if (alerts.length === 0) {
      alerts = DEMO_ALERTS.map((a, i) => ({
        ...a,
        _id: `demo-alert-${i}`,
        read: false,
        createdAt: new Date(Date.now() - i * 3600000).toISOString()
      }));
    }

    res.json({ success: true, count: alerts.length, alerts, isDemo: !isConnected() });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch alerts.' });
  }
};

// @desc    Mark alert as read
// @route   PUT /api/alerts/:id/read
const markRead = async (req, res) => {
  try {
    if (isConnected()) {
      const alert = await Alert.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
      return res.json({ success: true, message: 'Alert marked as read.', alert });
    }
    res.json({ success: true, message: 'Alert marked as read (demo).' });
  } catch (err) {
    res.json({ success: true, message: 'Alert marked as read (demo).' });
  }
};

module.exports = { getAlerts, markRead };
