const weatherService = require('../services/weatherService');
const { asyncHandler } = require('../middleware/errorHandler');

// GET /api/weather
exports.getWeatherData = asyncHandler(async (req, res) => {
  const { location } = req.query;
  const weather = await weatherService.getWeather(location || 'Delhi');
  res.json({
    success: true,
    weather,
    isDemo: weather.isDemo
  });
});
