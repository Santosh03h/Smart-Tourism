/**
 * Risk Analysis Engine
 * Calculates safety scores based on multiple risk factors.
 * ⚠️ DEMO DATA: All crime/risk data used here is fictional for demonstration purposes.
 */

// ─── Base Risk Data for Demo Locations ────────────────────────────────────────
const locationRiskProfiles = {
  delhi: {
    crimeRisk:    { score: 45, description: 'Moderate petty crime. Watch belongings in crowded areas.' },
    locationRisk: { score: 35, description: 'Generally safe but some areas require caution after dark.' }
  },
  agra: {
    crimeRisk:    { score: 38, description: 'Tourist scams possible near major monuments.' },
    locationRisk: { score: 30, description: 'City is well-patrolled around tourist sites.' }
  },
  jaipur: {
    crimeRisk:    { score: 30, description: 'Relatively safe city. Low violent crime rate.' },
    locationRisk: { score: 25, description: 'Tourist-friendly area with good infrastructure.' }
  },
  default: {
    crimeRisk:    { score: 40, description: 'Demo data: Crime risk is estimated.' },
    locationRisk: { score: 35, description: 'Demo data: Location risk is estimated.' }
  }
};

const getLocationKey = (location = '') => {
  const l = location.toLowerCase();
  if (l.includes('delhi'))  return 'delhi';
  if (l.includes('agra'))   return 'agra';
  if (l.includes('jaipur')) return 'jaipur';
  return 'default';
};

// ─── Time-based Risk ──────────────────────────────────────────────────────────
const getTimeRisk = () => {
  const hour = new Date().getHours();
  if (hour >= 22 || hour < 5) return { score: 70, level: 'High',     description: 'Late night travel increases risk. Avoid isolated areas.' };
  if (hour >= 20)             return { score: 45, level: 'Moderate', description: 'Evening travel — stay in well-lit public areas.' };
  if (hour >= 17)             return { score: 30, level: 'Low',      description: 'Evening rush hour. Moderate traffic expected.' };
  return                             { score: 15, level: 'Low',      description: 'Daytime travel is generally the safest.' };
};

// ─── Weather Risk ─────────────────────────────────────────────────────────────
const getWeatherRisk = (condition = 'clear') => {
  const c = condition.toLowerCase();
  if (c.includes('storm') || c.includes('thunder')) return { score: 80, level: 'High',     description: 'Severe weather. Avoid outdoor travel if possible.' };
  if (c.includes('heavy rain') || c.includes('flood')) return { score: 65, level: 'High',  description: 'Heavy rain may cause flooding. Use caution on roads.' };
  if (c.includes('rain') || c.includes('drizzle'))  return { score: 35, level: 'Moderate', description: 'Light rain. Roads may be slippery.' };
  if (c.includes('fog') || c.includes('mist'))      return { score: 40, level: 'Moderate', description: 'Reduced visibility. Drive slowly.' };
  if (c.includes('sunny') || c.includes('clear'))   return { score: 10, level: 'Low',      description: 'Clear weather. Great conditions for travel.' };
  return { score: 20, level: 'Low', description: 'Partly cloudy. Normal travel conditions.' };
};

// ─── Traffic Risk ─────────────────────────────────────────────────────────────
const getTrafficRisk = (trafficLevel = 'moderate') => {
  const t = trafficLevel.toLowerCase();
  if (t === 'severe')   return { score: 70, level: 'High',     description: 'Severe traffic congestion. Expect major delays.' };
  if (t === 'high')     return { score: 55, level: 'High',     description: 'Heavy traffic. Plan extra travel time.' };
  if (t === 'moderate') return { score: 35, level: 'Moderate', description: 'Moderate traffic. Some delays expected.' };
  return                       { score: 15, level: 'Low',      description: 'Light traffic. Smooth journey expected.' };
};

// ─── Crowd Risk ───────────────────────────────────────────────────────────────
const getCrowdRisk = (crowdLevel = 'moderate') => {
  const c = crowdLevel.toLowerCase();
  if (c === 'very high') return { score: 65, level: 'High',     description: 'Extremely crowded. High pickpocket risk. Keep valuables secure.' };
  if (c === 'high')      return { score: 45, level: 'Moderate', description: 'Crowded area. Be mindful of your belongings.' };
  if (c === 'moderate')  return { score: 25, level: 'Low',      description: 'Moderate crowd. Normal precautions apply.' };
  return                        { score: 10, level: 'Low',      description: 'Sparse crowd. Relaxed environment.' };
};

// ─── Main Risk Analysis Function ──────────────────────────────────────────────
const analyzeRisk = ({
  location = 'Unknown',
  weatherCondition = 'clear',
  trafficLevel = 'moderate',
  crowdLevel = 'moderate',
  groupSize = 1
}) => {
  const locKey = getLocationKey(location);
  const locProfile = locationRiskProfiles[locKey];

  const crimeRisk    = { ...locProfile.crimeRisk,    level: getRiskLevel(locProfile.crimeRisk.score) };
  const weatherRisk  = getWeatherRisk(weatherCondition);
  const trafficRisk  = getTrafficRisk(trafficLevel);
  const crowdRisk    = getCrowdRisk(crowdLevel);
  const timeRisk     = getTimeRisk();
  const locationRisk = { ...locProfile.locationRisk, level: getRiskLevel(locProfile.locationRisk.score) };

  // Group size bonus (larger groups = slightly safer)
  const groupBonus = Math.min(15, (groupSize - 1) * 3);

  // Weighted average
  const rawScore = (
    crimeRisk.score    * 0.25 +
    weatherRisk.score  * 0.20 +
    trafficRisk.score  * 0.15 +
    crowdRisk.score    * 0.15 +
    timeRisk.score     * 0.15 +
    locationRisk.score * 0.10
  ) - groupBonus;

  // Convert risk score to safety score (inverse)
  const safetyScore = Math.max(0, Math.min(100, Math.round(100 - rawScore)));
  const riskLevel   = getSafetyLevel(safetyScore);

  const recommendations = generateRecommendations({
    crimeRisk, weatherRisk, trafficRisk, crowdRisk, timeRisk, locationRisk, safetyScore, groupSize
  });

  return {
    location,
    safetyScore,
    riskLevel,
    factors: { crimeRisk, weatherRisk, trafficRisk, crowdRisk, timeRisk, locationRisk },
    recommendations,
    isDemo: true,
    disclaimer: '⚠️ DEMO DATA: All risk figures are simulated for demonstration purposes only.'
  };
};

const getRiskLevel = (score) => {
  if (score <= 25) return 'Low';
  if (score <= 50) return 'Moderate';
  if (score <= 75) return 'High';
  return 'Critical';
};

const getSafetyLevel = (safetyScore) => {
  if (safetyScore >= 76) return 'Low';       // Low risk = High safety
  if (safetyScore >= 51) return 'Moderate';
  if (safetyScore >= 26) return 'High';
  return 'Critical';
};

const generateRecommendations = ({ crimeRisk, weatherRisk, trafficRisk, timeRisk, groupSize, safetyScore }) => {
  const recs = [];
  if (crimeRisk.score > 50)    recs.push('Keep your belongings secure and avoid displaying expensive items.');
  if (weatherRisk.score > 50)  recs.push('Adverse weather detected — consider postponing outdoor activities.');
  if (trafficRisk.score > 50)  recs.push('Heavy traffic expected — use the Safest Route option.');
  if (timeRisk.score > 50)     recs.push('Late night travel — stick to busy, well-lit routes.');
  if (groupSize === 1)         recs.push('Solo traveler detected — consider traveling with a companion.');
  if (safetyScore < 50)        recs.push('Overall risk is elevated — stay alert and inform someone of your location.');
  if (safetyScore >= 75)       recs.push('Conditions look good! Enjoy your trip safely.');
  recs.push('Always keep emergency contact numbers saved: Police 100, Ambulance 108, Emergency 112.');
  return recs;
};

module.exports = { analyzeRisk, getRiskLevel, getSafetyLevel };
