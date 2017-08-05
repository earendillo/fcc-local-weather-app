<<<<<<< HEAD
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
=======
"use strict";

const COORDINATES_API = "http://ip-api.com/json";
const WEATHER_API_KEY = "3da6a7c77deb9c2ba46c840f36a5dc0f";

class Coordinates {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
};

class Weather {
  constructor(weather) {
    this._ID = weather._ID;
    this.description = weather.description;
    this.temperature = weather.temperature;
    this.pressure = weather.pressure;
    this.humidity = weather.humidity;
    this.windSpeed = weather.windSpeed;
    this.windDirection = weather.windDirection;
    this.location = weather.location;
  }

  convertTemperature() {
    return (this.temperature - 273).toFixed(1);
  };

  setWeatherIcon() {
    const WEATHER_CLASS = "wi wi-owm-";
    const weatherClassName = WEATHER_CLASS + this._ID;
    const weatherIcon = document.createElement("I");
          weatherIcon.className = weatherClassName;
          document.getElementById("weatherIcon").appendChild(weatherIcon);
  };

  setWindIcon() {
    const WIND_CLASS = "wi wi-wind from-";
    const WIND_CLASS_COMPLEMENT = "-deg";
    const windClassName = WIND_CLASS + this.windDirection + WIND_CLASS_COMPLEMENT;
    const windIcon = document.createElement("I");
          windIcon.className = windClassName;
          document.getElementById("windIcon").appendChild(windIcon);
  };
};

const request = (method, url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = resolve;
    xhr.onerror = reject;
    xhr.send();
  });
};

const getCoordinates = (event) => {
  const data = JSON.parse(event.target.response);
  const coordinates = new Coordinates(data.lat, data.lon);
  return coordinates;
};

const getWeatherAPI = coordinates => {
  const WEATHER_API = `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=` + WEATHER_API_KEY;
  return request('GET', WEATHER_API);
};

const getWeather = (event) => {
  const data = JSON.parse(event.target.response);
  console.log(data);
  const weather = {
    _ID: data.weather[0].id,
    description: data.weather[0].description,
    temperature: data.main.temp,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    windDirection: data.wind.deg,
    location: data.name
  }
  console.log(weather);
  return new Weather(weather);
};

const setWeather = (data) => {
  console.log(data);
  data.setWeatherIcon();
  data.setWindIcon();
  document.getElementById("city").innerHTML = data.location;
  document.getElementById("weatherID").innerHTML = data.description;
  document.getElementById("temp").innerHTML = data.convertTemperature();
  document.getElementById("press").innerHTML = data.pressure;
  document.getElementById("humid").innerHTML = data.humidity;
  document.getElementById("windSpeed").innerHTML = data.windSpeed;
};

const app = request('GET', COORDINATES_API)
  .then(event => getCoordinates(event))
  .then(coordinates => getWeatherAPI(coordinates))
  .then(event => getWeather(event))
  .then(event => setWeather(event))
  .catch(error => console.log(error));
>>>>>>> eafde13760b0814aa6997444579c8cee193c3569
