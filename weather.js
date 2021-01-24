const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weatherIcon");
const weatherPlace = document.querySelector(".location")

const API_KEY = config.MY_API_KEY;
const COORDS = 'coords';

function getWeather(lat, lon){
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const temperature = json.main.temp;
      const place = json.name;
      const currentWeather = json.weather[0].description;
      const currentWeatherIcon = json.weather[0].icon;
      weatherIcon.src = `http://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png`
      weather.innerText = `${temperature}'C ${currentWeather}`;
      weatherPlace.innerText = place;
    });
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  }
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(){
  weather.innerText = "LOCATION ERROR"
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null){
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();
