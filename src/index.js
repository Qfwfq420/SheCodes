function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function forecast(response) {
  let forecastData = response.data.daily;
  let forecastElement = document.querySelector(".forecast");
  let html = ``;
  forecastData.forEach(function (forecastDay, index) {
    if ((index < 7) & (index > 0)) {
      html =
        html +
        `<div class="col-2">
            <span class="weekday">${formatDay(forecastDay.dt)}</span>
            <br />
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" width ="42" class = "logo"/>
            <br />
            <span class='min data'>${Math.round(
              forecastDay.temp.min
            )}</span>°|<span class='max data'>${Math.round(
          forecastDay.temp.max
        )}</span>°
          </div>`;
    }
  });
  forecastElement.innerHTML = html;
}

function getForecast(coord) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(forecast);
}

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
  getForecast(response.data.coord);
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
  wind.innerHTML = windValue;
  desc.innerHTML = response.data.weather[0].description;
  getForecast(response.data.coord);
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
  let data = document.querySelectorAll(".data");
  data.forEach(function (obj) {
    temp = Number(obj.innerHTML);
    if (unit === "C") {
      obj.innerHTML = Math.round(((temp - 32) * 5) / 9);
    } else {
      obj.innerHTML = Math.round((temp * 9) / 5 + 32);
    }
  });
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
