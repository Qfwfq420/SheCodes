function getTempLoc(response) {
  let temp = document.querySelector("#num");
  temp.innerHTML = Math.round(response.data.main.temp);
  let name = document.querySelector(".city");
  name.innerHTML = response.data.name;
  let logo = document.querySelector(".current_logo");
  let logoUrl = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  logo.setAttribute(`src`, logoUrl);
  let wind = document.querySelector(".wind-speed");
  let desc = document.querySelector(".weather-description");
  wind.innerHTML = response.data.wind.speed;
  desc.innerHTML = response.data.weather[0].description;
}

function getTemp(response) {
  let title = document.querySelector(".city");
  title.innerHTML = response.data.name;
  let temp = document.querySelector("#num");
  temp.innerHTML = Math.round(response.data.main.temp);
  let logo = document.querySelector(".current_logo");
  let logoUrl = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  logo.setAttribute(`src`, logoUrl);
  let wind = document.querySelector(".wind-speed");
  let desc = document.querySelector(".weather-description");
  windValue = response.data.wind.speed;
  console.log(windValue);
  console.log(response.data.weather[0].description);
  wind.innerHTML = windValue;
  desc.innerHTML = response.data.weather[0].description;
}

function basedOnLoc(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(getTempLoc);
}

function loc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(basedOnLoc);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getTemp);
}

function changeTemp(event) {
  event.preventDefault();
  let unit = link.innerHTML;
  let num = document.querySelector("#num");
  let temp = Number(num.innerHTML);
  if (unit === "C") {
    num.innerHTML = Math.round((temp * 9) / 5 + 32);
    link.innerHTML = "F";
  } else {
    num.innerHTML = Math.round(((temp - 32) * 5) / 9);
    link.innerHTML = "C";
  }
}

function def(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getTemp);
}

def(`Tehran`);

let time = document.querySelector(".date");
let date = new Date();
let week = [
  "Sunday",
  " Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = week[date.getDay()];
let timeString = `${day} ${date.getHours()}:${date.getMinutes()}`;
time.innerHTML = timeString;

let form = document.querySelector("form");
form.addEventListener("submit", search);

let link = document.querySelector(".convert");
link.addEventListener("click", changeTemp);

let button = document.querySelector("button");
button.addEventListener("click", loc);
