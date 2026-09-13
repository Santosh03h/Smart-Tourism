const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: ['Weather', 'Traffic', 'High-Risk Area', 'Route', 'Crowd', 'Emergency', 'General'],
    required: true
  },
  title:       { type: String, required: true },
  description: { type: String, required: true },
  severity: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    default: 'LOW'
  },
  location:   { type: String },
  coordinates: { lat: Number, lng: Number },
  recommendation: { type: String },
  read:    { type: Boolean, default: false },
  isDemo:  { type: Boolean, default: true },
  expiresAt: { type: Date }
}, { timestamps: true });

// Auto-expire alert index
alertSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Alert', alertSchema);
