const aiService = require('../services/aiService');
const { asyncHandler } = require('../middleware/errorHandler');

// POST /api/ai/generate-itinerary
exports.generateItinerary = asyncHandler(async (req, res) => {
  const { destination, startDate, endDate, numberOfPeople, budget, interests, transport } = req.body;
  const result = await aiService.generateItinerary({ destination, startDate, endDate, numberOfPeople: numberOfPeople || 1, budget: budget || 10000, interests, transport });
  res.json({ success: true, ...result });
});

// POST /api/ai/safety-analysis
exports.safetyAnalysis = asyncHandler(async (req, res) => {
  const { location, timeOfDay, groupSize, weather } = req.body;
  const result = await aiService.analyzeRisk({ location, timeOfDay, groupSize, weather });
  const advice = await aiService.generateSafetyAdvice({ location });
  res.json({ success: true, ...result, safetyTips: advice.tips });
});

// POST /api/ai/chat
exports.chat = asyncHandler(async (req, res) => {
  const { message, history } = req.body;
  if (!message) return res.status(400).json({ success: false, message: 'Message is required.' });
  const result = await aiService.chatAssistant(message, history);
  res.json({ success: true, ...result });
});
