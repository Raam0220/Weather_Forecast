let map;
let marker;

function initMap() {
  map = L.map('map').setView([20, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  map.on('click', function(e) {
    const { lat, lng } = e.latlng;
    fetchWeather(lat, lng);
    if (marker) {
      marker.setLatLng([lat, lng]);
    } else {
      marker = L.marker([lat, lng]).addTo(map);
    }
  });
}

async function fetchWeather(lat, lon) {
  try {
    const response = await fetch(`http://localhost:8000/api/weather/forecast?lat=${lat}&lon=${lon}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    document.getElementById('cityName').innerText = data.name || "Unknown Location";
    document.getElementById('temp').innerText = `Temperature: ${data.main.temp} °C`;
    document.getElementById('description').innerText = `Weather: ${data.weather[0].description}`;

    document.getElementById('additionalInfo').innerHTML = `
      <li>Wind Speed: ${data.wind.speed} m/s</li>
      <li>Pressure: ${data.main.pressure} hPa</li>
      <li>Humidity: ${data.main.humidity}%</li>
      <li>Sunset Time: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</li>
    `;

    const mainWeather = data.weather[0].main.toLowerCase();
    document.body.className = '';
    if (mainWeather.includes('clear')) {
      document.body.classList.add('weather-clear');
    } else if (mainWeather.includes('clouds')) {
      document.body.classList.add('weather-clouds');
    } else if (mainWeather.includes('rain')) {
      document.body.classList.add('weather-rain');
    } else if (mainWeather.includes('thunderstorm')) {
      document.body.classList.add('weather-thunderstorm');
    } else if (mainWeather.includes('snow')) {
      document.body.classList.add('weather-snow');
    } else if (mainWeather.includes('mist') || mainWeather.includes('fog')) {
      document.body.classList.add('weather-mist');
    }
  } catch (error) {
    console.error('Fetch error:', error);
    alert('Failed to fetch weather');
  }
}

document.getElementById('searchBtn').addEventListener('click', async () => {
  const city = document.getElementById('cityInput').value;
  if (!city) {
    alert('Please enter a city');
    return;
  }

  const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
  const geoData = await geoResponse.json();

  if (geoData.length === 0) {
    alert('City not found!');
    return;
  }

  const lat = geoData[0].lat;
  const lon = geoData[0].lon;

  map.setView([lat, lon], 10);
  if (marker) {
    marker.setLatLng([lat, lon]);
  } else {
    marker = L.marker([lat, lon]).addTo(map);
  }

  fetchWeather(lat, lon);
});

window.onload = () => {
  initMap();
};
