let now = new Date();
let currentDay = now.getDay();
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = now.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${weekDays[currentDay]}, ${currentHour}:${currentMinute}`;

function showTemperature(response) {
  let newTemperature = Math.round(response.data.main.temp);
  let defaultTemperature = document.querySelector("#temperature-number");
  defaultTemperature.innerHTML = newTemperature;
}

function enterCity(event) {
  event.preventDefault();
  let cityBox = document.querySelector("#city-box");
  let cityName = document.querySelector("#city-country");
  cityName.innerHTML = `${cityBox.value}`;
  let apiKey = "898479a6582749588bdb0b175b82ac8d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityBox}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

let cityInput = document.querySelector("#enter-city");
cityInput.addEventListener("submit", enterCity);

function showCity(response) {
  let temperature = response.main.temp;
  let city = response.name;
  let sentence = `It is ${temperature} degrees in ${city} right now.`;
  alert(sentence);
}

function showPosition(position) {
  let infoList = document.querySelector("ul");
  infoList.innerHTML = `Your coordinates are ${position.coords.latitude}, and ${position.coords.longitude}`;
  let apiKey = "898479a6582749588bdb0b175b82ac8d";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCity);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getLocation);
