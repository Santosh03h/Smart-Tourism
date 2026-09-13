const User = require('../models/User');
const mongoose = require('mongoose');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

const isDemo = () => process.env.DEMO_MODE === 'true' || mongoose.connection.readyState !== 1;

// Demo user profile store (in-memory for demo mode)
const demoProfiles = {};

// GET /api/users/profile
exports.getProfile = asyncHandler(async (req, res) => {
  if (isDemo()) {
    const profile = demoProfiles[req.user._id] || {
      _id: req.user._id, name: req.user.name, email: req.user.email,
      phone: '+91-9876543210', role: req.user.role || 'user',
      travelType: 'Solo', interests: ['Historical', 'Food', 'Photography'],
      budgetRange: 'Moderate (₹5000–₹15000)', preferredLanguage: 'English',
      emergencyContact: { name: 'Emergency Contact', phone: '+91-9876543211', relation: 'Family' }
    };
    return res.json({ success: true, user: profile, demoMode: true });
  }
  const user = await User.findById(req.user._id);
  if (!user) throw new AppError('User not found.', 404);
  res.json({ success: true, user });
});

// PUT /api/users/profile
exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, emergencyContact, preferredLanguage, travelType, interests, budgetRange } = req.body;
  if (isDemo()) {
    const existing = demoProfiles[req.user._id] || {};
    demoProfiles[req.user._id] = { ...existing, _id: req.user._id, email: req.user.email, name: name || req.user.name, phone, emergencyContact, preferredLanguage, travelType, interests, budgetRange };
    return res.json({ success: true, user: demoProfiles[req.user._id], demoMode: true, message: 'Profile updated.' });
  }
  const user = await User.findByIdAndUpdate(req.user._id, { name, phone, emergencyContact, preferredLanguage, travelType, interests, budgetRange }, { new: true, runValidators: true });
  res.json({ success: true, user });
});
