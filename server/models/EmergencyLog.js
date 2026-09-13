const mongoose = require('mongoose');

const emergencyLogSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  location:      { lat: Number, lng: Number, address: String },
  timestamp:     { type: Date, default: Date.now },
  emergencyType: { type: String, enum: ['SOS', 'Medical', 'Police', 'Fire', 'Accident', 'Other'], default: 'SOS' },
  status:        { type: String, enum: ['triggered', 'acknowledged', 'resolved'], default: 'triggered' },
  message:       { type: String },
  contactedServices: [{ type: String }],
  isDemo:        { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('EmergencyLog', emergencyLogSchema);
