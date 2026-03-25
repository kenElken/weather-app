const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("result");
const error = document.getElementById("error");
const mapElement = document.getElementById("map");

const cityNameEl = document.getElementById("cityName");
const temperatureEl = document.getElementById("temperature");
const windspeedEl = document.getElementById("windspeed");
const weathercodeEl = document.getElementById("weathercode");

let map;
let marker;

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});

function translateWeatherCode(code) {
  switch (code) {
    case 0:
      return "Selge";
    case 1:
      return "Enamasti selge";
    case 2:
      return "Vahelduv pilvisus";
    case 3:
      return "Pilves";
    case 45:
    case 48:
      return "Udu";
    case 51:
    case 53:
    case 55:
      return "Nõrk vihm";
    case 61:
    case 63:
    case 65:
      return "Vihm";
    case 71:
    case 73:
    case 75:
      return "Lumi";
    case 80:
    case 81:
    case 82:
      return "Hoovihm";
    case 95:
      return "Äike";
    default:
      return "Ilmaandmed puuduvad";
  }
}

async function getWeather() {
  const city = cityInput.value.trim();
  error.textContent = "";
  result.classList.add("hidden");
  mapElement.classList.add("hidden");

  if (!city) {
    error.textContent = "SISESTA LINNA NIMI!";
    return;
  }

  try {
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=et&format=json`
    );
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      error.textContent = "Seda linna ei leitud.";
      return;
    }

    const place = geoData.results[0];
    const lat = place.latitude;
    const lon = place.longitude;

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code`
    );
    const weatherData = await weatherResponse.json();

    cityNameEl.textContent = `${place.name}, ${place.country}`;
    temperatureEl.textContent = weatherData.current.temperature_2m;
    windspeedEl.textContent = weatherData.current.wind_speed_10m;
    weathercodeEl.textContent = translateWeatherCode(weatherData.current.weather_code);

    result.classList.remove("hidden");
    mapElement.classList.remove("hidden");

    if (!map) {
      map = L.map("map").setView([lat, lon], 10);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
      }).addTo(map);

      marker = L.marker([lat, lon]).addTo(map);
    } else {
      map.setView([lat, lon], 10);
      marker.setLatLng([lat, lon]);
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 100);

  } catch (e) {
    error.textContent = "Andmete laadimine ebaõnnestus.";
  }
}