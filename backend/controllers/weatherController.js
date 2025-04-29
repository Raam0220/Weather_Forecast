import { fetchWeatherByCoordinates } from '../services/weatherService.js';
import { SearchHistory } from '../models/index.js';

export async function getWeatherForecast(req, res, next) {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and Longitude are required' });
    }

    const weatherData = await fetchWeatherByCoordinates(lat, lon);

    await SearchHistory.create({
      city: weatherData.name || "Unknown Location",  // changed
      temperature: weatherData.main.temp,             // changed
    });

    res.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
}
