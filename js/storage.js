export function saveFavoriteCities(favoriteCities) {
  localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
}

export function getFavoriteCities() {
  if(localStorage.getItem("favoriteCities") === null){
    setDefaultCity();
  }
  return localStorage.getItem("favoriteCities");

}

export function saveCurrentCity(currentCity) {
  localStorage.setItem("currentCity", currentCity);
}

export function getCurrentCity() {
  return localStorage.getItem("currentCity");

}

const cityList = new Set();
 function setDefaultCity(){
  localStorage.setItem("favoriteCities", JSON.stringify([...cityList]));
}
