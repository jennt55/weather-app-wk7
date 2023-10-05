function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="date">${formatDay(forecastDay.time)}</div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt="weather icon"
          width="42px"
        />
        <div class="weather-forecast-temperatures">
          <span class="forecast-temp-max">${Math.round(
            forecastDay.temperature.maximum
          )}° </span>
          <span class="forecast-temp-min">${Math.round(
            forecastDay.temperature.minimum
          )}°</span>
        </div>
      </div>
    
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "331fct734c14fe46300adod3e6c6aacb";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiURL).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.city;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML =
    "Humidity: " + Math.round(response.data.temperature.humidity) + "%";
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML =
    "Wind speed: " + Math.round(response.data.wind.speed) + "km/h";
  let dateTime = document.querySelector("#date-time");
  dateTime.innerHTML = formatDate(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  celsiusTemperature = response.data.temperature.current;

  getForecast(response.data.coordinates);
}
function search(city) {
  let apiKey = "331fct734c14fe46300adod3e6c6aacb";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  console.log(apiURL);
  axios.get(apiURL).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("New York");
