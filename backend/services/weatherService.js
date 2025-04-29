import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function fetchWeatherByCoordinates(lat, lon) {
  const apiKey = process.env.WEATHER_API_KEY;

  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat,
      lon,
      appid: apiKey,
      units: 'metric',
    },
  });

  return response.data;
}
