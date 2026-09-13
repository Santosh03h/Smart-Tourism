const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized. Please log in.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SmartTourism2024SecretKey!');
    const isDemo = process.env.DEMO_MODE === 'true' || require('mongoose').connection.readyState !== 1;
    if (isDemo) {
      req.user = { _id: decoded.id, name: decoded.name || 'Demo User', email: decoded.email || 'demo@tourism.com', role: decoded.role || 'user' };
    } else {
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        req.user = { _id: decoded.id, name: decoded.name || 'Demo User', email: decoded.email || 'demo@tourism.com', role: decoded.role || 'user' };
      }
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

// Admin only
const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'Access denied. Insufficient permissions.' });
  }
  next();
};

module.exports = { protect, authorize };
