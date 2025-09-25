const islogged = false;

function ToSignin() {
  location.assign("signin.html");
}

document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.querySelector(".city-input");
  const searchBtn = document.querySelector(".sub");

  const nasaPicEl = document.querySelector(".nasa-pic");
  const nasaTitleEl = document.querySelector(".nasa-title");
  const nasaExplanationEl = document.querySelector(".nasa-explanation");

  searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const city = cityInput.value || "London";
    const days = 5;
    const weatherapi = "yourapikey"; // Replace with your WeatherAPI key
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${weatherapi}&q=${city}&days=${days}&aqi=no&alerts=no`;

    // Weather API fetch
    async function getWeather() {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.location) {
          alert("Location not found. Please try again.");
          return;
        }

        const lati = data.location.lat;
        const longi = data.location.lon;
        console.log("Coords:", lati, longi);

        // Update weather widget
        document.querySelector("#widget-location").innerHTML = data.location.name;
        document.querySelector("#widget-time").innerHTML = `Local Time: ${data.location.localtime}`;
        document.querySelector(".temp-main").innerHTML = `${data.current.temp_c}°C`;
        // document.querySelector(".condition").innerHTML = data.current.condition.text;
        // document.querySelector(".weather-icon").innerHTML = `<img src="${data.current.condition.icon}" alt="icon">`;
        // document.querySelector(".humidity").innerHTML = `Humidity: ${data.current.humidity}%`;
        // document.querySelector(".wind").innerHTML = `Wind: ${data.current.wind_kph} kph`;
        // document.querySelector(".feels-like").innerHTML = `Feels like: ${data.current.feelslike_c}°C`;
        // document.querySelector(".uv").innerHTML = `UV Index: ${data.current.uv}`;

        // Call NASA satellite function
        getNasaSatellite(lati, longi);

      } catch (err) {
        alert("Error fetching weather: " + err);
      }
    }

    // NASA Satellite fetch
    async function getNasaSatellite(lat, lon) {
      const nasaKey = "apikey"; // Replace with your NASA API key
      console.log("Coords inside NASA function:", lat, lon);

      try {
        // Step 1: Get latest available date
        const assetsUrl = `https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&begin=2020-01-01&end=2025-09-25&api_key=${nasaKey}`;
        const assetsRes = await fetch(assetsUrl);
        const assetsData = await assetsRes.json();

        if (!assetsData.results || assetsData.results.length === 0) {
          if (nasaPicEl) nasaPicEl.innerHTML = "No satellite image available.";
          if (nasaTitleEl) nasaTitleEl.textContent = "";
          if (nasaExplanationEl) nasaExplanationEl.textContent = "";
          return;
        }

        const latestDate = assetsData.results[assetsData.results.length - 1].date.split("T")[0];

        // Step 2: Get actual image
        const imageUrl = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=${latestDate}&dim=0.1&api_key=${nasaKey}`;
        log.console("NASA Image URL:", imageUrl);
        if (nasaPicEl) nasaPicEl.innerHTML = `<img src="${imageUrl}" alt="satellite image" style="width:100%;border-radius:10px;">`;
        if (nasaTitleEl) nasaTitleEl.textContent = `Satellite view (${latestDate})`;
        if (nasaExplanationEl) nasaExplanationEl.textContent = "Image from NASA Earth Imagery API";

      } catch (err) {
        alert("Error fetching NASA image: " + err);
      }
    }

    getWeather();
  });
});
