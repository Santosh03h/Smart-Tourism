const RECOMMENDATIONS = {
  delhi: {
    restaurants: [
      { name: 'Karim\'s', category: 'Restaurant', description: 'Legendary Mughal cuisine since 1913. Famous for seekh kebabs and mutton burra.', estimatedPrice: '₹400–₹800', distance: '0.5 km from Red Fort', safetyScore: 88, recommendedTime: '1:00 PM – 3:00 PM', rating: 4.5 },
      { name: 'Bukhara, ITC Maurya', category: 'Fine Dining', description: 'World-famous frontier cuisine. Dal Bukhara is legendary.', estimatedPrice: '₹3000–₹5000', distance: 'Chanakyapuri', safetyScore: 96, recommendedTime: '7:00 PM – 10:00 PM', rating: 4.8 }
    ],
    localFood: [
      { name: 'Chandni Chowk Parantha Wali Gali', category: 'Street Food', description: 'Famous lane for 100+ varieties of stuffed paranthas. Try aloo, paneer, and banana paranthas!', estimatedPrice: '₹80–₹200', distance: 'Old Delhi', safetyScore: 75, recommendedTime: '8:00 AM – 12:00 PM', rating: 4.3 },
      { name: 'Jalebi Wala, Dariba Kalan', category: 'Street Food', description: 'Famous for fresh, crispy jalebis since 1884. A must-try!', estimatedPrice: '₹50–₹150', distance: 'Chandni Chowk', safetyScore: 78, recommendedTime: '7:00 AM – 11:00 AM', rating: 4.6 }
    ],
    attractions: [
      { name: 'Red Fort', category: 'Historical', description: 'UNESCO World Heritage Site. Magnificent Mughal-era fortress.', estimatedPrice: '₹35', distance: 'Old Delhi', safetyScore: 90, recommendedTime: '9:00 AM – 5:00 PM', rating: 4.5 },
      { name: 'India Gate', category: 'Landmark', description: 'War memorial and iconic Delhi landmark. Great for evening strolls.', estimatedPrice: 'Free', distance: 'Central Delhi', safetyScore: 92, recommendedTime: '6:00 AM – 10:00 PM', rating: 4.6 }
    ],
    hiddenGems: [
      { name: 'Agrasen ki Baoli', category: 'Hidden Gem', description: 'Ancient 60-step stepwell hidden in Connaught Place. Photogenic and peaceful.', estimatedPrice: 'Free', distance: 'Connaught Place', safetyScore: 85, recommendedTime: '9:00 AM – 5:00 PM', rating: 4.4 },
      { name: 'Nizamuddin Dargah Evening Qawwali', category: 'Culture', description: 'Spiritual Sufi music every Thursday evening. A truly unique Delhi experience.', estimatedPrice: 'Free', distance: 'Nizamuddin West', safetyScore: 80, recommendedTime: 'Thursday 6:00 PM', rating: 4.7 }
    ],
    shopping: [
      { name: 'Dilli Haat, INA', category: 'Shopping', description: 'Open-air craft market with artisans from all 29 states of India.', estimatedPrice: '₹30 entry + shopping', distance: 'INA Metro Station', safetyScore: 93, recommendedTime: '11:00 AM – 9:00 PM', rating: 4.3 },
      { name: 'Lajpat Nagar Market', category: 'Shopping', description: 'Great for ethnic wear, sarees, and home decor at bargain prices.', estimatedPrice: '₹500–₹2000', distance: 'Lajpat Nagar', safetyScore: 82, recommendedTime: '11:00 AM – 8:00 PM', rating: 4.1 }
    ]
  },
  agra: {
    attractions: [
      { name: 'Taj Mahal', category: 'Wonder', description: 'One of the Seven Wonders of the World. Visit at sunrise!', estimatedPrice: '₹1100 (foreigners ₹1300)', distance: 'City Center', safetyScore: 95, recommendedTime: 'Sunrise 5:30 AM', rating: 5.0 },
      { name: 'Agra Fort', category: 'Historical', description: 'Massive red sandstone fort with stunning Mughal architecture.', estimatedPrice: '₹550', distance: '2 km from Taj Mahal', safetyScore: 90, recommendedTime: '8:00 AM – 5:00 PM', rating: 4.5 }
    ],
    restaurants: [
      { name: 'Pinch of Spice', category: 'Restaurant', description: 'Popular restaurant serving North Indian cuisine. Great ambiance.', estimatedPrice: '₹500–₹1200', distance: 'Fatehabad Road', safetyScore: 92, recommendedTime: '12:00 PM – 3:30 PM', rating: 4.4 }
    ],
    localFood: [
      { name: 'Agra Petha (Panchhi Petha)', category: 'Local Sweet', description: 'Agra\'s iconic white candy. Try plain, saffron, and chocolate varieties.', estimatedPrice: '₹100–₹300/kg', distance: 'Throughout City', safetyScore: 90, recommendedTime: 'Anytime', rating: 4.5 }
    ],
    hiddenGems: [
      { name: 'Mehtab Bagh', category: 'Hidden Gem', description: 'Get the best rear view of Taj Mahal from across the Yamuna. Perfect for sunset.', estimatedPrice: '₹300', distance: '0.5 km from Taj Mahal', safetyScore: 88, recommendedTime: '5:00 PM – 6:30 PM', rating: 4.6 }
    ]
  },
  jaipur: {
    attractions: [
      { name: 'Amber Fort', category: 'Historical', description: 'Breathtaking hilltop fort with mirror palace and elephant rides.', estimatedPrice: '₹500', distance: '11 km from city', safetyScore: 92, recommendedTime: '8:00 AM – 4:30 PM', rating: 4.7 },
      { name: 'Hawa Mahal', category: 'Landmark', description: 'Palace of Winds — 5-storey honeycomb facade with 953 windows.', estimatedPrice: '₹200', distance: 'City Center', safetyScore: 88, recommendedTime: '9:00 AM – 4:30 PM', rating: 4.5 }
    ],
    restaurants: [
      { name: 'Chokhi Dhani', category: 'Cultural Dining', description: 'Rajasthani village resort experience with traditional thali and folk performances.', estimatedPrice: '₹700–₹1500', distance: '20 km from city', safetyScore: 95, recommendedTime: '6:00 PM – 11:00 PM', rating: 4.5 }
    ],
    localFood: [
      { name: 'Dal Baati Churma', category: 'Traditional Food', description: 'Rajasthan\'s iconic dish. Try it at LMB or any dhaba.', estimatedPrice: '₹150–₹400', distance: 'Throughout City', safetyScore: 90, recommendedTime: 'Lunch / Dinner', rating: 4.7 }
    ],
    hiddenGems: [
      { name: 'Panna Meena ka Kund', category: 'Hidden Gem', description: 'Geometric step well with stunning blue hue. Near Amber Fort.', estimatedPrice: 'Free', distance: '11 km from city', safetyScore: 87, recommendedTime: '7:00 AM – 5:00 PM', rating: 4.6 }
    ]
  }
};

// @desc    Get recommendations
// @route   GET /api/recommendations
const getRecommendations = async (req, res) => {
  const { destination = 'delhi', category } = req.query;
  const key = destination.toLowerCase().includes('agra') ? 'agra' : destination.toLowerCase().includes('jaipur') ? 'jaipur' : 'delhi';
  const data = RECOMMENDATIONS[key] || RECOMMENDATIONS.delhi;

  let result = {};
  if (category && data[category]) {
    result = { [category]: data[category] };
  } else {
    result = data;
  }

  res.json({ success: true, destination: key, recommendations: result, isDemo: true });
};

module.exports = { getRecommendations };
