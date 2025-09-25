const islogged = false;

function ToSignin() {
  location.assign("signin.html");
}

document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.querySelector(".city-input");
  const searchBtn = document.querySelector(".sub");

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

     
       

      } catch (err) {
        alert("Error fetching weather: " + err);
      }
    }
    getWeather();
  });
});
