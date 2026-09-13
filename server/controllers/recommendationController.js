const demoData = require('../utils/demoData');
const { asyncHandler } = require('../middleware/errorHandler');

// GET /api/recommendations
exports.getRecommendations = asyncHandler(async (req, res) => {
  const { category, location } = req.query;
  const destKey = (location || 'delhi').toLowerCase().replace(/\s+/g, '');
  const recs = demoData.recommendations;

  let result = [];
  if (category === 'restaurants') result = recs.restaurants;
  else if (category === 'hiddenGems') result = recs.hiddenGems;
  else if (category === 'activities') result = recs.activities;
  else {
    result = [...recs.restaurants, ...recs.hiddenGems, ...recs.activities];
  }

  res.json({
    success: true,
    recommendations: result,
    isDemo: true
  });
});
