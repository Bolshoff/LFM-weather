"use strict";
import {
  addFavoriteCityList,
  appendViewForecastItem,
  detailsTabItems,
  forecastTabItems,
  nowWeatherTabItems,
  searchForm,
  searchInput,
  tabsDetailsToggle,
  tabsForecastToggle,
  tabsItem,
  tabsNowToggle,
  delCurrentForecast,
} from "./view.js";
import {
  getCurrentCity,
  getFavoriteCities,
  saveCurrentCity,
  saveFavoriteCities,
} from "./storage.js";

const serverUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
const apiKey = "f660a2fb1e4bad108d6160b7f58c555f";
const favoriteCities = JSON.parse(getFavoriteCities());
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let cityName = getCurrentCity();
getCurrentCity();
showWeatherForecast(cityName);
fillFavoriteCitiesList();
getWeather(cityName);
showFavoriteWeather();

tabsItem.btnNow.addEventListener("click", tabsNowToggle);
tabsItem.btnDetails.addEventListener("click", tabsDetailsToggle);
tabsItem.btnForecast.addEventListener("click", tabsForecastToggle);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(searchInput.value);
  saveCurrentCity(searchInput.value);
});

async function getWeather(cityName) {
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
  let response = await fetch(url);
  let weather = await response.json();

  nowWeatherTabItems.temperature.innerHTML = `${Math.floor(weather.main.temp)}`;
  nowWeatherTabItems.city.innerHTML = weather.name;
  forecastTabItems.city.innerHTML = weather.name;
  let icon =
    "https://openweathermap.org/img/wn/" +
    weather["weather"][0].icon +
    "@2x.png";
  nowWeatherTabItems.weatherIcon.style.background = `url(${icon})`;
  showDetailsWeather(weather);
  showWeatherForecast(cityName);
}

function addFavoriteCity() {
  let nowCityName = nowWeatherTabItems.nowCityName.textContent;

  try {
    if (favoriteCities.includes(nowCityName)) {
      throw new Error("Город уже добавлен");
      return;
    }

    favoriteCities.push(nowCityName);
    addFavoriteCityList(nowCityName);

    showFavoriteWeather();
    saveFavoriteCities(favoriteCities);

    delFavoriteCity();
  } catch (e) {
    alert(e.message);
  }
}

function delFavoriteCity() {
  let close = document.querySelectorAll(".delete");
  close.forEach(function (button, i) {
    button.addEventListener("click", function () {
      favoriteCities.splice(i, 1);
      saveFavoriteCities(favoriteCities);
      button.parentElement.remove();
    });
  });
}

nowWeatherTabItems.favorite.addEventListener("click", addFavoriteCity);
async function showWeatherForecast(cityName) {
  const url = `${forecastUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
  let response = await fetch(url);
  let weather = await response.json();

  forecastTabItems.city.innerHTML = weather.city.name;
  const iconUrl = "https://openweathermap.org/img/wn/";
  delCurrentForecast();
  for (let i = 0; i < weather.list.length; i++) {
    let day = new Date(weather.list[i].dt * 1000).getDate();
    let monthShort = new Date(weather.list[i].dt * 1000).getMonth();
    const date = `${day} ${months[monthShort]}`;
    const time = `${new Date(weather.list[i].dt * 1000).getHours()}:00`;
    const temperature = `Temperature: ${Math.floor(weather.list[i].main.temp)}`;
    const feelslike = `Feels like: ${Math.floor(
      weather.list[i].main.feels_like
    )}`;
    const weatherDescription = `${weather.list[i].weather[0].main}`;
    const icon = `${weather.list[i].weather[0].icon}`;

    appendViewForecastItem(
      date,
      time,
      temperature,
      feelslike,
      weatherDescription,
      icon,
      iconUrl
    );
  }
}

function showFavoriteWeather() {
  let favoriteCity = document.querySelectorAll(".favorite-city-name");
  favoriteCity.forEach((city) => {
    city.addEventListener("click", () => {
      getWeather(city.textContent);
      showWeatherForecast(city.textContent);
      saveCurrentCity(city.textContent);
    });
  });
}

function showDetailsWeather(weather) {
  detailsTabItems.city.innerHTML = weather.name;
  detailsTabItems.temperature.innerHTML = `  ${Math.floor(
    weather.main.temp
  )} <span id="details-grad"></span>`;
  detailsTabItems.feelsLike.innerHTML = `  ${Math.floor(
    weather.main.feels_like
  )}`;
  detailsTabItems.weatherCondition.innerHTML = `  ${weather["weather"][0].main}`;
  let sunriseTime = new Date(weather.sys.sunrise * 1000);
  let getSunriseHour = sunriseTime.getHours();
  let getSunriseMinutes = sunriseTime.getMinutes();

  if (getSunriseMinutes < 10) {
    detailsTabItems.sunrise.innerHTML = `  ${getSunriseHour}:0${getSunriseMinutes}`;
  } else
    detailsTabItems.sunrise.innerHTML = `  ${getSunriseHour}:${getSunriseMinutes}`;

  let sunsetTime = new Date(weather.sys.sunset * 1000);
  let getSunsetHour = sunsetTime.getHours();
  let getSunsetMinutes = sunsetTime.getMinutes();
  if (getSunsetMinutes < 10) {
    detailsTabItems.sunset.innerHTML = `  ${getSunsetHour}:0${getSunsetMinutes}`;
  } else
    detailsTabItems.sunset.innerHTML = `  ${getSunsetHour}:${getSunsetMinutes}`;
}

function fillFavoriteCitiesList() {
  if (favoriteCities !== null) {
    favoriteCities.forEach((city) => addFavoriteCityList(city));
    delFavoriteCity();
  }
}
