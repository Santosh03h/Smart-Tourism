const mongoose = require('mongoose');

const riskDataSchema = new mongoose.Schema({
  location:     { type: String, required: true, trim: true },
  crimeRisk:    { type: Number, min: 0, max: 100, default: 30 },
  weatherRisk:  { type: Number, min: 0, max: 100, default: 20 },
  trafficRisk:  { type: Number, min: 0, max: 100, default: 40 },
  crowdRisk:    { type: Number, min: 0, max: 100, default: 35 },
  timeRisk:     { type: Number, min: 0, max: 100, default: 20 },
  locationRisk: { type: Number, min: 0, max: 100, default: 25 },
  overallScore: { type: Number, min: 0, max: 100 },
  riskLevel:    { type: String, enum: ['Low', 'Moderate', 'High', 'Critical'], default: 'Moderate' },
  isDemo:       { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('RiskData', riskDataSchema);
