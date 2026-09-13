// ─── AI Service — abstraction layer ───────────────────────────────────────────
// Supports real OpenAI/Gemini API OR deterministic demo fallback
const demoData = require('../utils/demoData');

const useAI = !!process.env.OPENAI_API_KEY;

// ─── Itinerary Generator ──────────────────────────────────────────────────────
const generateItinerary = async ({ destination, startDate, endDate, numberOfPeople, budget, interests, transport }) => {
  if (useAI) {
    // TODO: integrate OpenAI/Gemini API here
  }
  // Demo fallback — deterministic, realistic itinerary
  const dest = destination.toLowerCase().replace(/\s+/g, '');
  const destData = demoData.destinations[dest] || demoData.destinations.delhi;
  const places = destData.places || [];
  const food = destData.food || [];

  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);

  const itinerary = [];
  for (let d = 0; d < Math.min(days, 7); d++) {
    const date = new Date(start);
    date.setDate(start.getDate() + d);
    const dayPlaces = places.slice(d * 2, d * 2 + 6);
    itinerary.push({
      day: d + 1,
      date: date.toISOString().split('T')[0],
      morning:   dayPlaces.slice(0, 2).length ? dayPlaces.slice(0, 2) : [places[0] || places[0]],
      afternoon: dayPlaces.slice(2, 4).length ? dayPlaces.slice(2, 4) : (food[0] ? [food[0]] : [places[1]]),
      evening:   dayPlaces.slice(4, 6).length ? dayPlaces.slice(4, 6) : (food[1] ? [food[1]] : [places[0]]),
      notes: `Day ${d + 1} — Explore ${destination}. ${d === 0 ? 'Check-in to hotel and freshen up.' : 'Enjoy the local culture and cuisine.'}`
    });
  }

  const baseCostPerPerson = Math.min(budget * 0.8 / numberOfPeople, 5000);
  const estimatedCost = Math.round(baseCostPerPerson * numberOfPeople * days * 0.6);

  return {
    itinerary,
    estimatedCost,
    estimatedTravelTime: `${days} day${days > 1 ? 's' : ''}`,
    safetyScore: destData.safetyScore || 75,
    popularPlaces: places.slice(0, 3),
    hiddenGems: places.slice(3),
    localFood: food,
    isDemo: true,
    demoNote: 'AI service unavailable. Showing smart demo itinerary based on real destination data.'
  };
};

// ─── Risk Analysis ────────────────────────────────────────────────────────────
const analyzeRisk = async ({ location, timeOfDay, groupSize, weather }) => {
  if (useAI) {
    // TODO: integrate AI here
  }
  const dest = (location || 'delhi').toLowerCase().replace(/\s+/g, '');
  const destData = demoData.destinations[dest] || demoData.destinations.delhi;
  const risk = destData.risk || {};

  // Time modifier — night = higher risk
  const hour = timeOfDay || new Date().getHours();
  const timeMultiplier = hour >= 22 || hour <= 5 ? 1.3 : hour >= 20 ? 1.1 : 1;
  // Group size modifier — solo = higher risk
  const groupMultiplier = (groupSize || 1) === 1 ? 1.15 : groupSize <= 3 ? 1 : 0.9;

  const crimeRisk    = Math.min(100, Math.round((risk.crimeRisk || 30)   * groupMultiplier));
  const weatherRisk  = Math.min(100, Math.round((risk.weatherRisk || 20)));
  const trafficRisk  = Math.min(100, Math.round((risk.trafficRisk || 40)));
  const timeRisk     = Math.min(100, Math.round((risk.timeRisk || 20)    * timeMultiplier));
  const crowdRisk    = Math.min(100, Math.round((risk.crowdRisk || 35)));
  const locationRisk = Math.min(100, Math.round((risk.locationRisk || 25)));

  const raw = (crimeRisk + weatherRisk + trafficRisk + timeRisk + crowdRisk + locationRisk) / 6;
  const safetyScore = Math.round(100 - raw);
  const riskLevel = safetyScore >= 76 ? 'Low' : safetyScore >= 51 ? 'Moderate' : safetyScore >= 26 ? 'High' : 'Critical';

  const recommendations = [];
  if (crimeRisk > 50) recommendations.push('Keep valuables secure and stay in groups.');
  if (weatherRisk > 40) recommendations.push('Check weather forecast before heading out.');
  if (trafficRisk > 50) recommendations.push('Use safer alternate routes and avoid peak hours.');
  if (timeRisk > 50)   recommendations.push('Avoid traveling alone after dark.');
  if (crowdRisk > 50)  recommendations.push('Stay alert in crowded areas — pickpocket risk elevated.');
  if (recommendations.length === 0) recommendations.push('Conditions are generally safe. Enjoy your trip!');

  return {
    safetyScore, riskLevel,
    factors: { crimeRisk, weatherRisk, trafficRisk, timeRisk, crowdRisk, locationRisk },
    recommendations,
    location,
    isDemo: true
  };
};

// ─── Safety Advice ─────────────────────────────────────────────────────────────
const generateSafetyAdvice = async (context) => {
  const tips = [
    'Keep a charged power bank at all times.',
    'Save emergency numbers: 112 (Police), 108 (Ambulance), 101 (Fire).',
    'Share your live location with a trusted contact.',
    'Carry a small first-aid kit with basic medicines.',
    'Use only government-registered taxis (check license plate).',
    'Avoid accepting food or drinks from strangers.',
    'Keep digital and physical copies of all documents.',
    'Wear sun protection — hat, sunscreen (SPF 50+), and sunglasses.',
    'Stay hydrated — drink 3–4 litres of water per day in Indian summers.',
    'Register your trip with your country\'s embassy if travelling internationally.',
  ];
  return { tips, isDemo: true };
};

// ─── Chat Assistant ───────────────────────────────────────────────────────────
const chatAssistant = async (message, history = []) => {
  if (useAI) {
    // TODO: integrate AI chat here
  }
  const msg = message.toLowerCase();
  const responses = demoData.chatResponses;

  let reply = responses.default;
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey'))  reply = responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
  else if (msg.includes('safe') || msg.includes('safety') || msg.includes('risk')) reply = responses.safety;
  else if (msg.includes('weather') || msg.includes('rain') || msg.includes('hot') || msg.includes('temperature')) reply = responses.weather;
  else if (msg.includes('emergency') || msg.includes('help') || msg.includes('sos') || msg.includes('danger')) reply = responses.emergency;
  else if (msg.includes('route') || msg.includes('road') || msg.includes('path') || msg.includes('way')) reply = responses.route;
  else if (msg.includes('carry') || msg.includes('pack') || msg.includes('bring') || msg.includes('take')) reply = responses.packing;
  else if (msg.includes('hospital') || msg.includes('doctor') || msg.includes('medical')) reply = 'Nearest hospital is 3.5 km away. In case of medical emergency, call 108 immediately. Keep your blood type and any allergies noted in your wallet.';
  else if (msg.includes('police')) reply = 'Nearest police station is 1.2 km away. National emergency helpline: 112. Tourist helpline: 1363.';
  else if (msg.includes('food') || msg.includes('eat') || msg.includes('restaurant')) reply = 'Local food is generally safe. Prefer cooked food at busy restaurants, avoid roadside stalls in the evening, and drink only bottled water.';
  else if (msg.includes('night') || msg.includes('dark') || msg.includes('late')) reply = 'Avoid isolated areas at night. Use well-lit main roads, travel in groups, and inform your hotel about your schedule. Cab services like Ola and Uber are safer at night than autos.';
  else if (msg.includes('scam') || msg.includes('fraud') || msg.includes('cheat')) reply = 'Common tourist scams: overpriced rickshaws, gem shop commissions, fake "closed" attractions. Always negotiate prices upfront and use app-based cab services for transparent pricing.';
  else if (msg.includes('atm') || msg.includes('money') || msg.includes('cash')) reply = 'Use ATMs inside banks or shopping malls. Avoid standalone ATMs at night. Carry ₹2000–3000 cash for emergencies and use UPI apps (PhonePe, GPay) where possible.';

  return { reply, isDemo: true };
};

module.exports = { generateItinerary, analyzeRisk, generateSafetyAdvice, chatAssistant };
