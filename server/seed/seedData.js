const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');
const Trip = require('../models/Trip');
const Alert = require('../models/Alert');
const RiskData = require('../models/RiskData');
const demoData = require('../utils/demoData');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smart-tourism');
    console.log('🌱 Connected to MongoDB for seeding...');

    await User.deleteMany();
    await Trip.deleteMany();
    await Alert.deleteMany();
    await RiskData.deleteMany();

    // Users
    const demoUser = await User.create({
      name: 'Rahul Sharma',
      email: 'demo@tourism.com',
      password: 'demo123',
      phone: '+91-9876543210',
      travelType: 'Solo',
      preferredLanguage: 'English',
      interests: ['Historical', 'Food', 'Photography'],
      budgetRange: 'Moderate (₹5000–₹15000)',
      emergencyContact: { name: 'Priya Sharma', phone: '+91-9876543211', relation: 'Sister' }
    });

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@tourism.com',
      password: 'admin123',
      phone: '+91-9999999999',
      role: 'admin',
      travelType: 'Group',
      preferredLanguage: 'English',
      interests: ['Culture', 'Nature']
    });

    console.log('✅ Users seeded');

    // Trips
    await Trip.create([
      { userId: demoUser._id, destination: 'Delhi', startDate: new Date('2024-12-20'), endDate: new Date('2024-12-23'), numberOfPeople: 2, budget: 15000, interests: ['Historical', 'Food'], transport: 'Train', status: 'completed', safetyScore: 68, estimatedCost: 12500, estimatedTravelTime: '4 days' },
      { userId: demoUser._id, destination: 'Agra', startDate: new Date('2025-01-15'), endDate: new Date('2025-01-17'), numberOfPeople: 1, budget: 8000, interests: ['Historical', 'Photography'], transport: 'Bus', status: 'completed', safetyScore: 74, estimatedCost: 6200, estimatedTravelTime: '3 days' },
      { userId: demoUser._id, destination: 'Jaipur', startDate: new Date('2025-02-10'), endDate: new Date('2025-02-14'), numberOfPeople: 4, budget: 40000, interests: ['Culture', 'Shopping', 'Food'], transport: 'Car', status: 'planned', safetyScore: 81, estimatedCost: 32000, estimatedTravelTime: '5 days' }
    ]);

    console.log('✅ Trips seeded');

    // Alerts
    await Alert.create(demoData.alerts.map(a => ({ userId: demoUser._id, ...a })));
    console.log('✅ Alerts seeded');

    // Risk Data
    await RiskData.create(Object.values(demoData.destinations).map(d => ({
      location: d.name,
      crimeRisk: d.risk.crimeRisk,
      weatherRisk: d.risk.weatherRisk,
      trafficRisk: d.risk.trafficRisk,
      crowdRisk: d.risk.crowdRisk,
      timeRisk: d.risk.timeRisk,
      locationRisk: d.risk.locationRisk,
      overallScore: d.safetyScore,
      riskLevel: d.riskLevel
    })));
    console.log('✅ Risk Data seeded');

    console.log('🎉 Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDB();
