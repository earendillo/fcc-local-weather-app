"use strict";
const COORDINATES_API = "http://ip-api.com/json";
const WEATHER_API_KEY = "3da6a7c77deb9c2ba46c840f36a5dc0f";

const app = request('GET', COORDINATES_API)
   .then(geoData => getCoordinates(geoData))
   .then(coordinates => setWeatherAPI(coordinates))
   .then(weatherApi => request('GET', weatherApi))
   .then(event => extractData(event.target.response))
   .then(data => render(data))
   .catch(error => console.log(error));

function request(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = resolve;
    xhr.onerror = reject;
    xhr.send();
  });
};

function getCoordinates(event) {
  const data = JSON.parse(event.target.response);
  return {latitude: data.lat, longitude: data.lon};
};

function setWeatherAPI(coordinates) {
  return `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=` + WEATHER_API_KEY + '&units=metric';
};

function extractData(dataObject) {
  return JSON.parse(dataObject);
}

function render(data) {
  showIcon(data, 'weather');
  showIcon(data, 'wind');
  document.getElementById("city").innerHTML = data.name;
  document.getElementById("weatherID").innerHTML = data.weather[0].description;
  document.getElementById("temp").innerHTML = data.main.temp;
  document.getElementById("press").innerHTML = data.main.pressure;
  document.getElementById("humid").innerHTML = data.main.humidity;
  document.getElementById("windSpeed").innerHTML = data.wind.speed;
};

function showIcon(data, type) {
  const icon = document.createElement("I");
  let iconId;
  switch (type) {
    case 'weather':
      icon.className = `wi wi-owm-${data.weather[0].id}`;
      iconId = 'weatherIcon';
      break;
    case 'wind':
      icon.className = `wi wi-wind from-${data.wind.deg}-deg`;
      iconId = 'windIcon';
      break;
  }
  document.getElementById(iconId).appendChild(icon);
};
