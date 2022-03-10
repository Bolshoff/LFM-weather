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


