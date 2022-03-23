export const tabsItem = {
    btnNow: document.querySelector('.button-now'),
    btnDetails: document.querySelector('.button-details'),
    btnForecast: document.querySelector('.button-forecast'),
    tabNow: document.querySelector('.weather__now'),
    tabDetails: document.querySelector('.details'),
    tabForecast: document.querySelector('.forecast'),
    favoriteList : document.querySelector('.cities'),

}
export const nowWeatherTabItems = {
    temperature : document.querySelector('#now-temp'),
    weatherIcon : document.querySelector('#now-icon'),
    city : document.querySelector('#now-city'),
    favorite : document.querySelector('#now_city-like'),
    nowCityName :document.querySelector('.city-name'),
}
export const detailsTabItems ={
    city : document.querySelector('.details-city-name'),
    temperature :document.querySelector('.temp-details'),
    feelsLike : document.querySelector('.feels-like-details'),
    weatherCondition : document.querySelector('.weather-conditions'),
    sunrise :document.querySelector('.sunrise'),
    sunset : document.querySelector('.sunset'),

}
export const forecastTabItems = {
    city : document.querySelector('.forecast-city-name'),
    date  : document.querySelector('.date-span'),
    time : document.querySelector('.forecast-time-span'),
    temperature :  document.querySelector('.temperature-span'),
    rain : document.querySelector('.forecast-rain-span'),
    feelsLike : document.querySelector('.feels-like-span'),
    icon : document.querySelector('.icon-span'),
    // date2  : document.querySelector('#date2'),
    // time2 : document.querySelector('#forecast-time2'),
    // temperature2 :  document.querySelector('#temperature2'),
    // rain2 : document.querySelector('#forecast-rain2'),
    // feelsLike2 : document.querySelector('#feels-like2'),
    // icon2 : document.querySelector('#icon2'),
    // date3  : document.querySelector('#date3'),
    // time3 : document.querySelector('#forecast-time3'),
    // temperature3 :  document.querySelector('#temperature3'),
    // rain3 : document.querySelector('#forecast-rain3'),
    // feelsLike3 : document.querySelector('#feels-like3'),
    // icon3 : document.querySelector('#icon3'),

}
export const searchInput = document.querySelector('.search__input')
export const searchForm = document.querySelector('.search__form')


export function tabsNowToggle() {
    tabsItem.tabDetails.classList.add('hide');
    tabsItem.tabForecast.classList.add('hide');
    tabsItem.tabNow.classList.remove('hide');
    tabsItem.btnForecast.classList.remove('active-button')
    tabsItem.btnDetails.classList.remove('active-button')
    tabsItem.btnNow.classList.add('active-button')

}

export function tabsDetailsToggle() {

    tabsItem.tabNow.classList.add('hide');
    tabsItem.tabForecast.classList.add('hide');
    tabsItem.tabDetails.classList.remove('hide');
    tabsItem.btnForecast.classList.remove('active-button')
    tabsItem.btnNow.classList.remove('active-button')
    tabsItem.btnDetails.classList.add('active-button')

}

export function tabsForecastToggle() {

    tabsItem.tabNow.classList.add('hide');
    tabsItem.tabDetails.classList.add('hide');
    tabsItem.tabForecast.classList.remove('hide');
    tabsItem.btnNow.classList.remove('active-button')
    tabsItem.btnDetails.classList.remove('active-button')
    tabsItem.btnForecast.classList.add('active-button')

}

export function addFavoriteCityList(cityName){
    let favoriteCity = document.createElement('li');
    favoriteCity.innerHTML = ` <span class="favorite-city-name">${cityName}</span><span class="delete"></span>`;
    favoriteCity.classList = 'favorite-city';
    tabsItem.favoriteList.append(favoriteCity);
    searchInput.value  = '';

}
export  function appendViewForecastItem(date, time, temperature, feelslike, weather, icon, iconUrl){
    let forecastItem = `  
                          <div class="forecast__item">
                            <div class="date"><span class='date-span'>${date}</span><span class="forecast-time-span" >${time}</span></div>
                            <div class="temperature" ><span >${temperature}</span><span class="grad">&#176;</span><span class="forecast-rain-span"  >${weather}</span></div>
                            <div class="forecast__feelslike" ><span >${feelslike}</span><span class="grad">&#176;</span><span  class=" icon forecast__weather-icon" style="background-image:url(${iconUrl}${icon}.png)" ></span></div>
                          </div>
                         `;

    const forecastItemWrapper = document.querySelector('.forecast-item-wrapper');
    forecastItemWrapper.insertAdjacentHTML('beforeend',forecastItem);
}

export function delCurrentForecast() {
    const forecastItems  = document.querySelectorAll('.forecast__item');
    forecastItems.forEach(item => item.remove());
}


