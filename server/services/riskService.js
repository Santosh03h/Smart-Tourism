// Risk Score Calculation Service
const calculateRiskScore = ({ crimeRisk = 30, weatherRisk = 20, trafficRisk = 40, timeRisk = 20, crowdRisk = 35, locationRisk = 25 }) => {
  // Weighted average — crime and time have higher weight
  const weights = { crimeRisk: 0.25, weatherRisk: 0.15, trafficRisk: 0.20, timeRisk: 0.20, crowdRisk: 0.10, locationRisk: 0.10 };
  const raw = (
    crimeRisk * weights.crimeRisk +
    weatherRisk * weights.weatherRisk +
    trafficRisk * weights.trafficRisk +
    timeRisk * weights.timeRisk +
    crowdRisk * weights.crowdRisk +
    locationRisk * weights.locationRisk
  );
  const safetyScore = Math.round(Math.max(0, Math.min(100, 100 - raw)));
  const riskLevel = safetyScore >= 76 ? 'Low' : safetyScore >= 51 ? 'Moderate' : safetyScore >= 26 ? 'High' : 'Critical';
  return { safetyScore, riskLevel, raw: Math.round(raw) };
};

const getRiskColor = (score) => {
  if (score >= 76) return 'green';
  if (score >= 51) return 'yellow';
  if (score >= 26) return 'orange';
  return 'red';
};

const getRiskRecommendations = (factors) => {
  const recs = [];
  if (factors.crimeRisk > 50)    recs.push({ icon: '🔐', text: 'Keep valuables secure and avoid displaying expensive items.' });
  if (factors.weatherRisk > 40)  recs.push({ icon: '🌧️', text: 'Carry an umbrella or raincoat. Check weather updates frequently.' });
  if (factors.trafficRisk > 50)  recs.push({ icon: '🚦', text: 'Use alternate routes. Avoid driving during peak hours (8–10 AM, 5–8 PM).' });
  if (factors.timeRisk > 50)     recs.push({ icon: '🌙', text: 'Limit travel after 10 PM. Use trusted cab services instead of walking.' });
  if (factors.crowdRisk > 50)    recs.push({ icon: '👥', text: 'Be alert in crowded areas. Keep bags in front and zip all pockets.' });
  if (factors.locationRisk > 40) recs.push({ icon: '📍', text: 'Prefer well-known tourist routes. Avoid isolated or poorly-lit areas.' });
  if (recs.length === 0)         recs.push({ icon: '✅', text: 'Overall conditions are safe. Enjoy your trip responsibly!' });
  return recs;
};

module.exports = { calculateRiskScore, getRiskColor, getRiskRecommendations };
