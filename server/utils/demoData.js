// ─── Demo Data: Delhi, Agra, Jaipur ───────────────────────────────────────────
const demoData = {
  destinations: {
    delhi: {
      name: 'Delhi',
      coordinates: { lat: 28.6139, lng: 77.2090 },
      weather: { temp: 32, condition: 'Partly Cloudy', humidity: 65, windSpeed: 12, feelsLike: 35 },
      safetyScore: 68,
      riskLevel: 'Moderate',
      places: [
        { name: 'Red Fort', category: 'Historical', description: 'UNESCO World Heritage Site — iconic Mughal-era fortress.', estimatedCost: 50, visitTime: '2–3 hours', distance: '2.1 km', safetyLevel: 'Safe', bestTime: 'Morning (9 AM – 12 PM)', coordinates: { lat: 28.6562, lng: 77.2410 } },
        { name: 'Qutub Minar', category: 'Historical', description: 'World\'s tallest brick minaret from the 13th century.', estimatedCost: 40, visitTime: '1.5–2 hours', distance: '15 km', safetyLevel: 'Safe', bestTime: 'Early Morning', coordinates: { lat: 28.5244, lng: 77.1855 } },
        { name: 'India Gate', category: 'Historical', description: 'War memorial and iconic landmark at the heart of Delhi.', estimatedCost: 0, visitTime: '1 hour', distance: '5 km', safetyLevel: 'Safe', bestTime: 'Evening', coordinates: { lat: 28.6129, lng: 77.2295 } },
        { name: 'Chandni Chowk', category: 'Food & Shopping', description: 'Bustling old market famous for street food, spices, and textiles.', estimatedCost: 500, visitTime: '2–3 hours', distance: '3 km', safetyLevel: 'Moderate', bestTime: 'Morning (10 AM – 1 PM)', coordinates: { lat: 28.6506, lng: 77.2299 } },
        { name: 'Lotus Temple', category: 'Religious', description: 'Stunning Bahá\'í House of Worship shaped like a lotus flower.', estimatedCost: 0, visitTime: '1–1.5 hours', distance: '12 km', safetyLevel: 'Safe', bestTime: 'Afternoon', coordinates: { lat: 28.5535, lng: 77.2588 } },
        { name: 'Humayun\'s Tomb', category: 'Historical', description: 'Mughal architectural masterpiece — precursor to the Taj Mahal.', estimatedCost: 35, visitTime: '1.5–2 hours', distance: '8 km', safetyLevel: 'Safe', bestTime: 'Morning', coordinates: { lat: 28.5933, lng: 77.2507 } },
      ],
      food: [
        { name: 'Paranthe Wali Gali', category: 'Street Food', description: 'Famous lane in Chandni Chowk serving stuffed parathas since 1875.', estimatedCost: 150, distance: '3 km', safetyLevel: 'Safe', bestTime: 'Breakfast' },
        { name: 'Karim\'s Restaurant', category: 'Restaurant', description: 'Legendary Mughlai restaurant near Jama Masjid since 1913.', estimatedCost: 400, distance: '3.5 km', safetyLevel: 'Safe', bestTime: 'Lunch/Dinner' },
        { name: 'Dilli Haat', category: 'Food Court', description: 'Open-air crafts market with food stalls from all Indian states.', estimatedCost: 300, distance: '10 km', safetyLevel: 'Safe', bestTime: 'Evening' },
      ],
      routes: [
        { routeType: 'fastest', distance: '14.2 km', estimatedTime: '35 min', safetyScore: 72, trafficLevel: 'High', riskFactors: ['Heavy city traffic', 'Rush-hour congestion'] },
        { routeType: 'safest', distance: '17.8 km', estimatedTime: '48 min', safetyScore: 91, trafficLevel: 'Low', riskFactors: ['Well-lit roads', 'Police presence'] },
        { routeType: 'balanced', distance: '15.5 km', estimatedTime: '41 min', safetyScore: 83, trafficLevel: 'Moderate', riskFactors: ['Moderate traffic'] },
      ],
      risk: { crimeRisk: 38, weatherRisk: 22, trafficRisk: 55, timeRisk: 20, crowdRisk: 45, locationRisk: 30, overallScore: 68 }
    },
    agra: {
      name: 'Agra',
      coordinates: { lat: 27.1767, lng: 78.0081 },
      weather: { temp: 29, condition: 'Sunny', humidity: 52, windSpeed: 8, feelsLike: 31 },
      safetyScore: 74,
      riskLevel: 'Moderate',
      places: [
        { name: 'Taj Mahal', category: 'Historical', description: 'One of the Seven Wonders of the World — a symbol of eternal love.', estimatedCost: 1100, visitTime: '3–4 hours', distance: '0.5 km', safetyLevel: 'Safe', bestTime: 'Sunrise (6–8 AM)', coordinates: { lat: 27.1751, lng: 78.0421 } },
        { name: 'Agra Fort', category: 'Historical', description: 'UNESCO World Heritage Site — massive Mughal fort with palaces.', estimatedCost: 650, visitTime: '2–3 hours', distance: '2 km', safetyLevel: 'Safe', bestTime: 'Morning', coordinates: { lat: 27.1795, lng: 78.0211 } },
        { name: 'Fatehpur Sikri', category: 'Historical', description: 'Abandoned Mughal city — a ghost-town wonder of architecture.', estimatedCost: 610, visitTime: '2–3 hours', distance: '40 km', safetyLevel: 'Safe', bestTime: 'Morning', coordinates: { lat: 27.0945, lng: 77.6627 } },
        { name: 'Mehtab Bagh', category: 'Nature', description: 'Moonlight garden across the Yamuna with stunning Taj views.', estimatedCost: 50, visitTime: '1 hour', distance: '1 km', safetyLevel: 'Moderate', bestTime: 'Sunset', coordinates: { lat: 27.1792, lng: 78.0481 } },
        { name: 'Itmad-ud-Daula\'s Tomb', category: 'Historical', description: 'Known as Baby Taj — exquisite marble inlay work.', estimatedCost: 110, visitTime: '1–1.5 hours', distance: '4 km', safetyLevel: 'Safe', bestTime: 'Afternoon', coordinates: { lat: 27.1948, lng: 78.0418 } },
      ],
      food: [
        { name: 'Petha Sweet Shop', category: 'Street Food', description: 'Agra is famous for its petha — a translucent candy made from ash gourd.', estimatedCost: 200, distance: '1 km', safetyLevel: 'Safe', bestTime: 'Anytime' },
        { name: 'Peshwai Restaurant', category: 'Restaurant', description: 'Popular local restaurant known for Mughlai cuisine and daal baati.', estimatedCost: 350, distance: '2 km', safetyLevel: 'Safe', bestTime: 'Lunch' },
        { name: 'Joney\'s Place', category: 'Restaurant', description: 'Budget-friendly cafe near Taj loved by backpackers.', estimatedCost: 180, distance: '0.8 km', safetyLevel: 'Safe', bestTime: 'Breakfast/Lunch' },
      ],
      routes: [
        { routeType: 'fastest', distance: '8.5 km', estimatedTime: '22 min', safetyScore: 78, trafficLevel: 'Moderate', riskFactors: ['Tourist zone traffic'] },
        { routeType: 'safest', distance: '10.2 km', estimatedTime: '30 min', safetyScore: 94, trafficLevel: 'Low', riskFactors: ['Well-monitored route'] },
        { routeType: 'balanced', distance: '9.1 km', estimatedTime: '25 min', safetyScore: 88, trafficLevel: 'Low', riskFactors: ['Minor congestion'] },
      ],
      risk: { crimeRisk: 28, weatherRisk: 15, trafficRisk: 32, timeRisk: 18, crowdRisk: 38, locationRisk: 22, overallScore: 74 }
    },
    jaipur: {
      name: 'Jaipur',
      coordinates: { lat: 26.9124, lng: 75.7873 },
      weather: { temp: 35, condition: 'Hot & Sunny', humidity: 40, windSpeed: 10, feelsLike: 38 },
      safetyScore: 81,
      riskLevel: 'Low',
      places: [
        { name: 'Amber Fort', category: 'Historical', description: 'Magnificent hillside fort with mirror work and intricate frescoes.', estimatedCost: 550, visitTime: '2–3 hours', distance: '11 km', safetyLevel: 'Safe', bestTime: 'Morning (8–11 AM)', coordinates: { lat: 26.9855, lng: 75.8513 } },
        { name: 'Hawa Mahal', category: 'Historical', description: 'Palace of the Winds — iconic 953-window honeycomb facade.', estimatedCost: 200, visitTime: '1 hour', distance: '2 km', safetyLevel: 'Safe', bestTime: 'Morning', coordinates: { lat: 26.9239, lng: 75.8267 } },
        { name: 'City Palace', category: 'Historical', description: 'Royal palace complex with museums, courtyards, and galleries.', estimatedCost: 500, visitTime: '2 hours', distance: '2.5 km', safetyLevel: 'Safe', bestTime: 'Morning/Afternoon', coordinates: { lat: 26.9258, lng: 75.8237 } },
        { name: 'Jantar Mantar', category: 'Historical', description: 'UNESCO astronomical observatory — largest stone sundial in the world.', estimatedCost: 200, visitTime: '1 hour', distance: '2.5 km', safetyLevel: 'Safe', bestTime: 'Morning', coordinates: { lat: 26.9247, lng: 75.8241 } },
        { name: 'Nahargarh Fort', category: 'Adventure', description: 'Hilltop fort with panoramic city views — perfect for sunset.', estimatedCost: 100, visitTime: '1.5 hours', distance: '7 km', safetyLevel: 'Moderate', bestTime: 'Sunset', coordinates: { lat: 26.9430, lng: 75.8033 } },
        { name: 'Bapu Bazaar', category: 'Shopping', description: 'Jaipur\'s famous street market for textiles, gems, and handicrafts.', estimatedCost: 1000, visitTime: '1.5–2 hours', distance: '1.5 km', safetyLevel: 'Moderate', bestTime: 'Morning (10 AM – 1 PM)', coordinates: { lat: 26.9191, lng: 75.8195 } },
      ],
      food: [
        { name: 'Rawat Mishtan Bhandar', category: 'Street Food', description: 'Famous for kachori and samosas — a Jaipur institution since 1944.', estimatedCost: 100, distance: '1.2 km', safetyLevel: 'Safe', bestTime: 'Breakfast' },
        { name: 'Laxmi Mishtan Bhandar', category: 'Restaurant', description: 'Popular LMB restaurant known for dal baati churma and sweets.', estimatedCost: 400, distance: '2 km', safetyLevel: 'Safe', bestTime: 'Lunch' },
        { name: 'Chokhi Dhani', category: 'Cultural Experience', description: 'Rajasthani village resort with traditional food and folk performances.', estimatedCost: 900, distance: '22 km', safetyLevel: 'Safe', bestTime: 'Evening/Dinner' },
      ],
      routes: [
        { routeType: 'fastest', distance: '11.5 km', estimatedTime: '28 min', safetyScore: 80, trafficLevel: 'Moderate', riskFactors: ['City center traffic'] },
        { routeType: 'safest', distance: '13.8 km', estimatedTime: '38 min', safetyScore: 95, trafficLevel: 'Low', riskFactors: ['Minimal risk route'] },
        { routeType: 'balanced', distance: '12.2 km', estimatedTime: '32 min', safetyScore: 89, trafficLevel: 'Low', riskFactors: ['Slight traffic'] },
      ],
      risk: { crimeRisk: 20, weatherRisk: 35, trafficRisk: 28, timeRisk: 15, crowdRisk: 30, locationRisk: 18, overallScore: 81 }
    }
  },

  alerts: [
    { type: 'Weather Alert', title: 'High Temperature Warning', description: 'Temperature expected to rise above 40°C in afternoon hours. Stay hydrated and avoid outdoor activities from 12 PM–4 PM.', severity: 'MEDIUM', location: 'Jaipur', timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), action: 'Carry water, wear sunscreen, rest during peak hours' },
    { type: 'Traffic Alert', title: 'Heavy Traffic Near Red Fort', description: 'Major congestion detected near Red Fort due to a local event. Expected delay of 25–35 minutes.', severity: 'MEDIUM', location: 'Delhi', timestamp: new Date(Date.now() - 1 * 3600000).toISOString(), action: 'Use alternate route via Ring Road' },
    { type: 'High-Risk Area Alert', title: 'Pickpocket Activity Reported', description: 'Multiple pickpocket incidents reported near Chandni Chowk market area. Stay alert and keep valuables secure.', severity: 'HIGH', location: 'Delhi', timestamp: new Date(Date.now() - 30 * 60000).toISOString(), action: 'Keep bags in front, avoid displaying valuables' },
    { type: 'Emergency Alert', title: 'Medical Facility Reminder', description: 'Nearest hospital: AIIMS Delhi — 8.5 km. Nearest police station: 1.2 km.', severity: 'LOW', location: 'Delhi', timestamp: new Date().toISOString(), action: 'Save emergency numbers: 112 (Police), 108 (Ambulance)' },
    { type: 'Crowd Alert', title: 'Taj Mahal — High Visitor Count', description: 'Taj Mahal currently experiencing high visitor density. Best to visit early morning or late afternoon for a better experience.', severity: 'LOW', location: 'Agra', timestamp: new Date(Date.now() - 45 * 60000).toISOString(), action: 'Visit at 6–7 AM for best experience with fewer crowds' },
  ],

  recommendations: {
    restaurants: [
      { name: 'Moti Mahal', category: 'Restaurant', description: 'Legendary restaurant — birthplace of butter chicken. Must-visit for North Indian cuisine.', estimatedPrice: '₹400–600/person', distance: '3.5 km', safetyScore: 92, recommendedTime: 'Dinner', location: 'Delhi' },
      { name: 'Indian Accent', category: 'Fine Dining', description: 'Award-winning restaurant blending Indian flavors with global techniques. Great for a special meal.', estimatedPrice: '₹2000+/person', distance: '8 km', safetyScore: 96, recommendedTime: 'Dinner', location: 'Delhi' },
      { name: 'Jhankar Restaurant', category: 'Restaurant', description: 'Rooftop dining with stunning Taj Mahal view. Romantic and memorable.', estimatedPrice: '₹600–900/person', distance: '0.5 km', safetyScore: 90, recommendedTime: 'Lunch/Dinner', location: 'Agra' },
    ],
    hiddenGems: [
      { name: 'Agrasen Ki Baoli', category: 'Hidden Gem', description: '14th-century stepwell with 108 steps — hauntingly beautiful and often uncrowded.', estimatedPrice: 'Free', distance: '6 km', safetyScore: 85, recommendedTime: 'Morning', location: 'Delhi' },
      { name: 'Sikandra (Akbar\'s Tomb)', category: 'Hidden Gem', description: 'Emperor Akbar\'s mausoleum — less crowded than Taj but equally impressive.', estimatedPrice: '₹110', distance: '10 km', safetyScore: 88, recommendedTime: 'Morning', location: 'Agra' },
      { name: 'Panna Meena Ka Kund', category: 'Hidden Gem', description: 'A stunning geometric stepwell in Jaipur rarely visited by tourists.', estimatedPrice: 'Free', distance: '12 km', safetyScore: 87, recommendedTime: 'Morning', location: 'Jaipur' },
    ],
    activities: [
      { name: 'Sunrise Taj Mahal Tour', category: 'Activity', description: 'Witness the Taj Mahal at sunrise — the most magical experience in India.', estimatedPrice: '₹1100 (entry)', distance: '0.5 km', safetyScore: 95, recommendedTime: '5:30–7 AM', location: 'Agra' },
      { name: 'Old Delhi Heritage Walk', category: 'Activity', description: 'Guided walk through 400 years of history in Old Delhi\'s labyrinthine lanes.', estimatedPrice: '₹500–800', distance: '3 km', safetyScore: 78, recommendedTime: 'Morning', location: 'Delhi' },
      { name: 'Elephant Ride at Amber Fort', category: 'Activity', description: 'Traditional elephant ride up the hill to Amber Fort. Iconic Jaipur experience.', estimatedPrice: '₹1100', distance: '11 km', safetyScore: 85, recommendedTime: 'Morning 8–11 AM', location: 'Jaipur' },
    ]
  },

  priceEstimates: {
    taxi: { delhi: { perKm: 14, base: 50 }, agra: { perKm: 12, base: 40 }, jaipur: { perKm: 13, base: 45 } },
    hotel: { budget: { min: 800, max: 2000 }, moderate: { min: 2000, max: 6000 }, comfortable: { min: 6000, max: 15000 }, luxury: { min: 15000, max: 50000 } },
    restaurants: { street: { min: 50, max: 200 }, casual: { min: 200, max: 600 }, fine: { min: 600, max: 2000 } },
  },

  emergencyServices: {
    police: [
      { name: 'Delhi Police Control Room', phone: '100', distance: '1.2 km', location: 'Delhi' },
      { name: 'Agra Police Station', phone: '0562-2330032', distance: '2.5 km', location: 'Agra' },
      { name: 'Jaipur Police Control', phone: '141-2744000', distance: '1.8 km', location: 'Jaipur' },
    ],
    hospitals: [
      { name: 'AIIMS Delhi', phone: '011-26588500', distance: '8.5 km', location: 'Delhi' },
      { name: 'S.N. Medical College Agra', phone: '0562-2600140', distance: '3.5 km', location: 'Agra' },
      { name: 'SMS Hospital Jaipur', phone: '0141-2518888', distance: '4.2 km', location: 'Jaipur' },
    ],
    fire: [
      { name: 'Delhi Fire Station', phone: '101', distance: '2 km', location: 'Delhi' },
      { name: 'Agra Fire Station', phone: '0562-2526900', distance: '3 km', location: 'Agra' },
      { name: 'Jaipur Fire Station', phone: '0141-2700666', distance: '2.5 km', location: 'Jaipur' },
    ],
  },

  chatResponses: {
    greetings: ['Hello! How can I help with your trip safety today?', 'Hi there! I\'m your AI Safety Assistant. What do you need help with?'],
    safety: 'Based on our analysis, the current safety score for your area is 78/100 (Low Risk). Keep your emergency contacts handy, stay on well-lit roads after dark, and avoid isolated areas.',
    weather: 'Current weather looks manageable. Temperatures are expected to be high in the afternoon. Carry water, wear sunscreen, and prefer morning or evening for sightseeing.',
    emergency: 'In an emergency, call 112 (Police), 108 (Ambulance), or 101 (Fire). Your location is being tracked. Tap the SOS button for immediate assistance.',
    route: 'I recommend the safest route option which takes 55 minutes with a safety score of 91/100. It avoids the high-traffic area near the city center.',
    packing: 'For this trip, I recommend: first-aid kit, water bottle, sunscreen, emergency charger, local SIM card, copies of important documents, and emergency contact numbers.',
    default: 'I understand your concern. Based on current conditions, everything looks relatively safe. Please keep your location sharing active and stay on recommended routes.'
  }
};

module.exports = demoData;
