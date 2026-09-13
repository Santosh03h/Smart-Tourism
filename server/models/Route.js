const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  tripId:        { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  routeType:     { type: String, enum: ['fastest', 'safest', 'balanced'], required: true },
  from:          { type: String },
  to:            { type: String },
  distance:      { type: String },
  estimatedTime: { type: String },
  safetyScore:   { type: Number, min: 0, max: 100 },
  trafficLevel:  { type: String, enum: ['Low', 'Moderate', 'High'], default: 'Moderate' },
  riskFactors:   [{ type: String }],
  waypoints:     [{ lat: Number, lng: Number, name: String }],
  isDemo:        { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);
