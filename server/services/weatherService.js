const axios = require('axios');
const demoData = require('../utils/demoData');

const getWeather = async (location) => {
  // Try real API if key exists
  if (process.env.WEATHER_API_KEY) {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}&units=metric`
      );
      const d = res.data;
      return {
        location: d.name,
        temp: Math.round(d.main.temp),
        feelsLike: Math.round(d.main.feels_like),
        humidity: d.main.humidity,
        windSpeed: Math.round(d.wind.speed * 3.6),
        condition: d.weather[0].main,
        description: d.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`,
        isDemo: false
      };
    } catch (err) {
      console.log('Weather API failed, using demo data:', err.message);
    }
  }
  // Demo fallback
  const dest = (location || 'delhi').toLowerCase().replace(/\s+/g, '');
  const destData = demoData.destinations[dest] || demoData.destinations.delhi;
  return { ...destData.weather, location: destData.name, isDemo: true };
};

module.exports = { getWeather };
