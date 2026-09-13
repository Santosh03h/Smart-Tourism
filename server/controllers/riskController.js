const { calculateRiskScore, getRiskRecommendations } = require('../services/riskService');
const demoData = require('../utils/demoData');
const { asyncHandler } = require('../middleware/errorHandler');

// POST /api/risk/analyze
exports.analyzeRisk = asyncHandler(async (req, res) => {
  const { location, crimeRisk, weatherRisk, trafficRisk, timeRisk, crowdRisk, locationRisk } = req.body;
  const destKey = (location || 'delhi').toLowerCase().replace(/\s+/g, '');
  const defaultRisk = demoData.destinations[destKey]?.risk || { crimeRisk: 30, weatherRisk: 20, trafficRisk: 40, timeRisk: 20, crowdRisk: 35, locationRisk: 25 };

  const factors = {
    crimeRisk: crimeRisk ?? defaultRisk.crimeRisk,
    weatherRisk: weatherRisk ?? defaultRisk.weatherRisk,
    trafficRisk: trafficRisk ?? defaultRisk.trafficRisk,
    timeRisk: timeRisk ?? defaultRisk.timeRisk,
    crowdRisk: crowdRisk ?? defaultRisk.crowdRisk,
    locationRisk: locationRisk ?? defaultRisk.locationRisk,
  };

  const { safetyScore, riskLevel } = calculateRiskScore(factors);
  const recommendations = getRiskRecommendations(factors);

  res.json({
    success: true,
    location: location || 'Delhi',
    safetyScore,
    riskLevel,
    factors,
    recommendations,
    isDemo: true
  });
});

// GET /api/risk/:location
exports.getRiskByLocation = asyncHandler(async (req, res) => {
  const location = req.params.location || 'Delhi';
  const destKey = location.toLowerCase().replace(/\s+/g, '');
  const destData = demoData.destinations[destKey] || demoData.destinations.delhi;

  const factors = destData.risk;
  const { safetyScore, riskLevel } = calculateRiskScore(factors);
  const recommendations = getRiskRecommendations(factors);

  res.json({
    success: true,
    location: destData.name,
    safetyScore,
    riskLevel,
    factors,
    recommendations,
    isDemo: true
  });
});
