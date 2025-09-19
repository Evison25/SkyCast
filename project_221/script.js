const apiKey = "C6LOxmKJIZ2h7q5D"; 

// New Delhi coordinates and altitude
const lat = 28.6139;
const lon = 77.2090;
const asl = 216; // Altitude in meters

const url = `https://my.meteoblue.com/packages/basic-day?lat=${lat}&lon=${lon}&asl=${asl}&format=json&apikey=${C6LOxmKJIZ2h7q5D}`;

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const forecast = data.data_day;
    let output = "Date\t\tMax Temp (°C)\n----------------------------\n";

    forecast.time.forEach((date, i) => {
      const temp = forecast.temperature_max[i];
      output += `${date}\t${temp}°C\n`;
    });

    document.getElementById("forecast").innerText = output;
  })
  .catch(error => {
    document.getElementById("forecast").innerText = "Failed to load forecast.\n" + error;
    console.error("Error fetching weather data:", error);
  });
