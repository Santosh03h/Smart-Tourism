export const CLIENT_DEMO_DATA = {
  currentTrip: {
    _id: 'trip003',
    destination: 'Jaipur',
    startDate: '2025-02-10',
    endDate: '2025-02-14',
    numberOfPeople: 4,
    budget: 40000,
    interests: ['Culture', 'Shopping', 'Food'],
    transport: 'Car',
    status: 'active',
    safetyScore: 81,
    estimatedCost: 32000,
    estimatedTravelTime: '5 days',
    weather: { temp: 35, condition: 'Sunny', humidity: 40, windSpeed: 10 },
  },
  
  todayItinerary: [
    { time: '09:00 AM', title: 'Visit Amber Fort', location: 'Amer, Jaipur', category: 'Historical', safety: 'Safe' },
    { time: '01:30 PM', title: 'Lunch at Rawat Mishtan Bhandar', location: 'Station Road, Jaipur', category: 'Food', safety: 'Safe' },
    { time: '03:30 PM', title: 'Explore Hawa Mahal & City Palace', location: 'Pink City, Jaipur', category: 'Historical', safety: 'Safe' },
    { time: '07:00 PM', title: 'Shopping at Bapu Bazaar', location: 'Bapu Bazaar', category: 'Shopping', safety: 'Moderate' },
  ],

  recentAlerts: [
    { id: '1', type: 'Weather Alert', title: 'High Temperature Warning', description: 'Temperature expected to reach 40°C. Stay hydrated.', severity: 'MEDIUM', time: '10 mins ago', location: 'Jaipur' },
    { id: '2', type: 'Traffic Alert', title: 'Road Closure near Pink City', description: 'Major maintenance work on Hawa Mahal road.', severity: 'LOW', time: '1 hour ago', location: 'Jaipur' }
  ],

  destinations: ['Delhi', 'Agra', 'Jaipur', 'Goa', 'Varanasi', 'Udaipur', 'Kerala', 'Manali'],

  interestsList: ['Historical', 'Food', 'Adventure', 'Nature', 'Shopping', 'Culture', 'Photography', 'Religious Places'],
  
  travelTypes: ['Solo', 'Couple', 'Family', 'Friends', 'Group']
};
