const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  category:      { type: String },
  description:   { type: String },
  estimatedCost: { type: Number },
  visitTime:     { type: String },
  distance:      { type: String },
  safetyLevel:   { type: String, enum: ['Low', 'Moderate', 'High', 'Safe'], default: 'Safe' },
  bestTime:      { type: String },
  coordinates:   { lat: Number, lng: Number }
}, { _id: false });

const dayPlanSchema = new mongoose.Schema({
  day:       { type: Number, required: true },
  date:      { type: String },
  morning:   [placeSchema],
  afternoon: [placeSchema],
  evening:   [placeSchema],
  notes:     { type: String }
}, { _id: false });

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination:   { type: String, required: [true, 'Destination is required'], trim: true },
  startDate:     { type: Date,   required: [true, 'Start date is required'] },
  endDate:       { type: Date,   required: [true, 'End date is required'] },
  numberOfPeople:{ type: Number, default: 1, min: 1, max: 50 },
  budget:        { type: Number, required: true },
  interests: [{
    type: String,
    enum: ['Historical', 'Food', 'Adventure', 'Nature', 'Shopping', 'Culture', 'Photography']
  }],
  transport: {
    type: String,
    enum: ['Car', 'Bus', 'Train', 'Flight', 'Bike', 'Other'],
    default: 'Car'
  },
  itinerary:            [dayPlanSchema],
  estimatedCost:        { type: Number },
  estimatedTravelTime:  { type: String },
  safetyScore:          { type: Number, min: 0, max: 100 },
  status: {
    type: String,
    enum: ['planned', 'active', 'completed', 'cancelled'],
    default: 'planned'
  },
  notes:   { type: String },
  isDemo:  { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
