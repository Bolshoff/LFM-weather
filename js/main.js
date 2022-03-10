import {tabsForecastToggle, tabsNowToggle, tabsDetailsToggle, tabsItem} from "./view.js";
import {nowWeatherTabItems, searchInput, searchForm} from "./view.js";
import {detailsTabItems} from "./view.js";
import {addFavoriteCityList} from "./view.js";

const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const favoriteCities = [];
let cityName = 'Boston';

getWeather(cityName);

tabsItem.btnNow.addEventListener('click', () => {
    tabsNowToggle();

});
tabsItem.btnDetails.addEventListener('click', () => {
    tabsDetailsToggle();
});
tabsItem.btnForecast.addEventListener('click', () => {
    tabsForecastToggle();
});

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

            let icon = "https://openweathermap.org/img/wn/" + weather["weather"][0].icon + "@2x.png";
            nowWeatherTabItems.weatherIcon.style.background = `url(${icon})`;

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
            getWeather(city.textContent)

        })
    })
}

