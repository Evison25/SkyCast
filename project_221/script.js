
const islogged=false;
function ToSignin(){
location.assign("signin.html");
}
function ToIndex() {
  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const terms = document.getElementById("terms").checked;

  if (!firstName || !lastName || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  if (!terms) {
    alert("You must accept the Terms & Conditions.");
    islogged=true;
    return;
  }

  // If all good → redirect
  location.replace("index.html");
}





document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.querySelector('.city-input');
    const searchBtn = document.querySelector('.sub');

    if (!searchBtn) {
        console.error("Button not found!");
        return;
    }

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(cityInput.value);

        const apiKey = "5c671fd4d38f4428ac2153109252409";  
        const city = cityInput.value || "London";  
        const days = 5;  

        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}&aqi=no&alerts=no`;

        async function getWeather() {
            try {
                const response = await fetch(url);
                const text = await response.text();
                const data = JSON.parse(text);

                console.log(data);
                document.querySelector('#widget-location').innerHTML = data.location ? data.location.name : "Unknown City";
                document.querySelector('.temp-main').innerHTML = data.current ? `${data.current.temp_c}°C` : "N/A";
                document.querySelector('.condition').innerHTML = data.current ? data.current.condition.text : "N/A";
                document.querySelector('.weather-icon').innerHTML = data.current ? data.current.condition.icon : "N/A";
                document.querySelector('.humidity').innerHTML = data.current ? `Humidity: ${data.current.humidity}%` : "N/A";
                document.querySelector('.wind').innerHTML = data.current ? `Wind: ${data.current.wind_kph} kph` : "N/A";
                document.querySelector('.feels-like').innerHTML = data.current ? `Feels like: ${data.current.feelslike_c}°C` : "N/A";
                document.querySelector('.uv').innerHTML = data.current ? `UV Index: ${data.current.uv}` : "N/A";
                document.querySelector('#widget-time').innerHTML = data.location ? `Local Time: ${data.location.localtime}` : "N/A";



                // day-weather
                document.querySelectorAll('.time-temp').innerHTML = '';}
            catch (err) {
                console.error("Error fetching or parsing weather:", err);
            }
        }

        getWeather();
    });
});
