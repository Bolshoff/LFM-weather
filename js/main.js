import {tabsForecastToggle, tabsNowToggle, tabsDetailsToggle, tabsItem} from "./view.js";
import {nowWeatherTabItems, searchInput, searchForm} from "./view.js";
import {detailsTabItems, forecastTabItems} from "./view.js";
import {addFavoriteCityList} from "./view.js";

const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const favoriteCities = [];
const months = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let cityName = 'Boston';

getWeather(cityName);
showWeatherForecast(cityName);

tabsItem.btnNow.addEventListener('click',  tabsNowToggle);
tabsItem.btnDetails.addEventListener('click', tabsDetailsToggle);
tabsItem.btnForecast.addEventListener('click', tabsForecastToggle);

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getWeather(searchInput.value);

});

function getWeather(cityName){

    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            else{
                throw new Error()
            }
        })
        .then(weather => {
            nowWeatherTabItems.temperature.innerHTML = `${Math.floor(weather.main.temp)}`;
            nowWeatherTabItems.city.innerHTML = weather.name;
            forecastTabItems.city.innerHTML = weather.name;
            let icon = "https://openweathermap.org/img/wn/" + weather["weather"][0].icon + "@2x.png";
            nowWeatherTabItems.weatherIcon.style.background = `url(${icon})`;
            showDetailsWeather(weather);

        }).catch(alert);

}

function addFavoriteCity(){
    let nowCityName = nowWeatherTabItems.nowCityName.textContent;
    try {
        if(favoriteCities.includes(nowCityName)){
            throw new Error('Город уже добавлен')
            return;
        }
        favoriteCities.push(nowCityName);
        addFavoriteCityList(nowCityName);
        delfavoriteCity();
        showFavoriteWeather();


    }catch (e){
        alert(e.message)
    }




}
function delfavoriteCity(){
    let close = document.querySelectorAll('.delete');
    close.forEach(function (button,i ){
        button.addEventListener('click', function (){
            button.parentElement.remove();
            favoriteCities.splice(i, 1);
        } )
    })
}

nowWeatherTabItems.favorite.addEventListener('click', addFavoriteCity);


function showFavoriteWeather(){
    let favoriteCity = document.querySelectorAll('.favorite-city-name')
    favoriteCity.forEach(city=>{
        city.addEventListener('click', ()=>{
            getWeather(city.textContent);
            showWeatherForecast(city.textContent);

        })
    })
}
function showDetailsWeather(weather){
    detailsTabItems.city.innerHTML = weather.name;
    detailsTabItems.temperature.innerHTML = `  ${Math.floor(weather.main.temp)} <span id="details-grad"></span>`;
    detailsTabItems.feelsLike.innerHTML = `  ${Math.floor(weather.main.feels_like)}`;
    detailsTabItems.weatherCondition.innerHTML = `  ${weather['weather'][0].main}`;
    let sunriseTime = new Date(weather.sys.sunrise * 1000);
    let getSunriseHour = sunriseTime.getHours();
    let getSunriseMinutes = sunriseTime.getMinutes();

    if(getSunriseMinutes < 10){ detailsTabItems.sunrise.innerHTML =`  ${getSunriseHour}:0${getSunriseMinutes}`;
    }else  detailsTabItems.sunrise.innerHTML =`  ${getSunriseHour}:${getSunriseMinutes}`;

    let sunsetTime = new Date(weather.sys.sunset * 1000);
    let getSunsetHour = sunsetTime.getHours();
    let getSunsetMinutes = sunsetTime.getMinutes();
    if(getSunsetMinutes < 10){  detailsTabItems.sunset.innerHTML = `  ${getSunsetHour}:0${getSunsetMinutes}`;
    }else detailsTabItems.sunset.innerHTML = `  ${getSunsetHour}:${getSunsetMinutes}`;
}
function showWeatherForecast(cityName){
    const url = `${forecastUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            else{
                throw new Error()
            }
        })
        .then(weather => {

            forecastTabItems.city.innerHTML = weather.city.name;
            console.log(weather)
            console.log(new Date (weather.list[0].dt * 1000).getHours() )
            let day = new Date (weather.list[0].dt * 1000).getDate();
            let monthShort = new Date (weather.list[0].dt * 1000).getMonth();
            console.log(months[monthShort])
            let forecastDay = `${day} ${months[monthShort]}`;
            console.log(forecastDay);
            forecastTabItems.date1.textContent = forecastDay;
            forecastTabItems.time1.textContent =` ${(new Date (weather.list[0].dt * 1000).getHours())}:00`;
            forecastTabItems.temperature1.textContent = `Temperature: ${Math.floor(weather.list[0].main.temp)}`;
            forecastTabItems.feelsLike1.textContent = `Feels like: ${Math.floor(weather.list[0].main.feels_like)}`;
            forecastTabItems.rain1.textContent = `${weather.list[0].weather[0].main}`;
            console.log(weather.list[0].weather[0]);
            let icon = "https://openweathermap.org/img/wn/" + weather.list[0].weather[0].icon + "@2x.png";
            forecastTabItems.icon1.style.background = `url(${icon})`;

            forecastTabItems.date2.textContent = forecastDay;
            forecastTabItems.time2.textContent =` ${(new Date (weather.list[1].dt * 1000).getHours())}:00`;
            forecastTabItems.temperature2.textContent = `Temperature: ${Math.floor(weather.list[1].main.temp)}`;
            forecastTabItems.feelsLike2.textContent = `Feels like: ${Math.floor(weather.list[1].main.feels_like)}`;
            forecastTabItems.rain2.textContent = `${weather.list[1].weather[0].main}`;
            console.log(weather.list[1].weather[0]);
            let icon2 = "https://openweathermap.org/img/wn/" + weather.list[1].weather[0].icon + "@2x.png";
            forecastTabItems.icon2.style.background = `url(${icon2})`;

            forecastTabItems.date3.textContent = forecastDay;
            forecastTabItems.time3.textContent =` ${(new Date (weather.list[2].dt * 1000).getHours())}:00`;
            forecastTabItems.temperature3.textContent = `Temperature: ${Math.floor(weather.list[2].main.temp)}`;
            forecastTabItems.feelsLike3.textContent = `Feels like: ${Math.floor(weather.list[2].main.feels_like)}`;
            forecastTabItems.rain3.textContent = `${weather.list[2].weather[0].main}`;
            console.log(weather.list[2].weather[0]);
            let icon3 = "https://openweathermap.org/img/wn/" + weather.list[2].weather[0].icon + "@2x.png";
            forecastTabItems.icon3.style.background = `url(${icon3})`;

        }).catch(alert);
}

