export function saveFavoriteCities(favoriteCities) {
  localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
}

export function getFavoriteCities() {
  return localStorage.getItem("favoriteCities");
}

export function saveCurrentCity(currentCity) {
  localStorage.setItem("currentCity", currentCity);
}

export function getCurrentCity() {
  return localStorage.getItem("currentCity");

}
let cityList = [];
export function setDefaultCity(){
  localStorage.setItem("favoriteCities", JSON.stringify(cityList));
}
