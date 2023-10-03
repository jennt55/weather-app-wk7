function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.city;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.temperature.humidity) + "%";
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed) + "km/h";
}

let apiKey = "331fct734c14fe46300adod3e6c6aacb";
let apiURL = `https://api.shecodes.io/weather/v1/current?query=New York&key=${apiKey}`;

console.log(apiURL);
axios.get(apiURL).then(displayTemperature);
