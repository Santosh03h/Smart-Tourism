const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

const signToken = (user) => jwt.sign(
  { id: user._id, email: user.email, name: user.name, role: user.role },
  process.env.JWT_SECRET || 'SmartTourism2024SecretKey!',
  { expiresIn: process.env.JWT_EXPIRE || '7d' }
);

const isDemo = () => process.env.DEMO_MODE === 'true' || mongoose.connection.readyState !== 1;

// Demo users for when DB is unavailable
const DEMO_USERS = [
  { _id: 'demo001', name: 'Rahul Sharma', email: 'demo@tourism.com', passwordPlain: 'demo123', phone: '+91-9876543210', role: 'user', travelType: 'Solo', interests: ['Historical', 'Food', 'Photography'], budgetRange: 'Moderate (₹5000–₹15000)', preferredLanguage: 'English', emergencyContact: { name: 'Priya Sharma', phone: '+91-9876543211', relation: 'Sister' } },
  { _id: 'admin001', name: 'Admin User', email: 'admin@tourism.com', passwordPlain: 'admin123', phone: '+91-9999999999', role: 'admin', travelType: 'Group', interests: ['Culture', 'Nature'], budgetRange: 'Comfortable (₹15000–₹30000)', preferredLanguage: 'English', emergencyContact: { name: 'Admin Contact', phone: '+91-9999999998', relation: 'Colleague' } },
];

// POST /api/auth/register
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, emergencyContact, preferredLanguage, travelType } = req.body;
  if (!name || !email || !password) throw new AppError('Name, email, and password are required.', 400);

  if (isDemo()) {
    const cleanEmail = email.toLowerCase().trim();
    // Check if demo user already exists
    let demoUser = DEMO_USERS.find(u => u.email === cleanEmail);
    if (demoUser) {
      demoUser.name = name;
      demoUser.passwordPlain = password;
      if (phone) demoUser.phone = phone;
      if (emergencyContact) demoUser.emergencyContact = emergencyContact;
      if (preferredLanguage) demoUser.preferredLanguage = preferredLanguage;
      if (travelType) demoUser.travelType = travelType;
    } else {
      demoUser = {
        _id: `user_${Date.now()}`,
        name,
        email: cleanEmail,
        passwordPlain: password,
        phone: phone || '',
        role: 'user',
        travelType: travelType || 'Solo',
        preferredLanguage: preferredLanguage || 'English',
        emergencyContact: emergencyContact || { name: '', phone: '', relation: '' }
      };
      DEMO_USERS.push(demoUser);
    }
    const token = signToken(demoUser);
    const { passwordPlain, ...userOut } = demoUser;
    return res.status(201).json({ success: true, token, user: userOut, demoMode: true, message: 'Account registered successfully.' });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) throw new AppError('Email already registered. Please login.', 400);

  const user = await User.create({ name, email, password, phone, emergencyContact, preferredLanguage, travelType });
  const token = signToken(user);
  res.status(201).json({ success: true, token, user });
});

// POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new AppError('Email and password are required.', 400);

  // Demo mode check
  if (isDemo()) {
    const cleanEmail = email.trim().toLowerCase();
    const demoUser = DEMO_USERS.find(u => u.email === cleanEmail);
    
    // Support registered demo users, as well as default demo/admin credentials
    const isPasswordValid = demoUser && (
      demoUser.passwordPlain === password ||
      (cleanEmail === 'demo@tourism.com' && (password === 'Demo@123' || password === 'demo123')) ||
      (cleanEmail === 'admin@tourism.com' && (password === 'admin123' || password === 'Admin@123'))
    );

    if (!demoUser || !isPasswordValid) {
      throw new AppError('Invalid email or password.', 401);
    }
    const token = signToken(demoUser);
    const { passwordPlain, ...userOut } = demoUser;
    return res.json({ success: true, token, user: userOut, demoMode: true });
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password.', 401);
  }
  const token = signToken(user);
  res.json({ success: true, token, user });
});

// GET /api/auth/me
exports.getMe = asyncHandler(async (req, res) => {
  if (isDemo()) {
    const demoUser = DEMO_USERS.find(u => u._id === req.user._id) || req.user || DEMO_USERS[0];
    const { passwordPlain, ...userOut } = demoUser;
    return res.json({ success: true, user: userOut, demoMode: true });
  }
  const user = await User.findById(req.user._id);
  res.json({ success: true, user });
});
