"use strict";

const COORDINATES_API = "http://ip-api.com/json";
const WEATHER_API_KEY = "3da6a7c77deb9c2ba46c840f36a5dc0f";
const WEATHER_CLASS = "wi wi-owm-";
const WIND_CLASS = "wi wi-wind from-";
const WIND_CLASS_COMPLEMENT = "-deg";

class Coordinates {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
};

class Weather {
  constructor(weatherID, temperature, pressure, humidity, windSpeed, windDirection, location) {
    this.weatherID = weatherID;
    this.temperature = temperature;
    this.pressure = pressure;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.windDirection = windDirection;
    this.location = location;
  }
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

const getCoordinates = event => {
  const data = JSON.parse(event.target.response);
  const coordinates = new Coordinates(data.lat, data.lon);
  return coordinates;
};

const getWeatherAPI = coordinates => {
  const WEATHER_API = `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=` + WEATHER_API_KEY;
  return request('GET', WEATHER_API);
};

const getWeather = event => {
  const data = JSON.parse(event.target.response);
  const weather = new Weather(data.weather[0].id, data.main.temp, data.main.pressure, data.main.humidity, data.wind.speed, data.wind.deg, data.name);
  return weather;
};

const convertTemperature = temperature => {
  const convertedTemperature = (temperature - 273).toFixed(1);
  return convertedTemperature;
};

const setWeatherIcon = weatherID => {
  const weatherClassName = WEATHER_CLASS + weatherID;
  const weatherIcon = document.createElement("I");
        weatherIcon.className = weatherClassName;
        document.getElementById("weatherIcon").appendChild(weatherIcon);
};

const setWindIcon = windDirection => {
  const windClassName = WIND_CLASS + windDirection + WIND_CLASS_COMPLEMENT;
  const windIcon = document.createElement("I");
        windIcon.className = windClassName;
        document.getElementById("windIcon").appendChild(windIcon);
};

const setWeather = data => {
  setWeatherIcon(data.weatherID);
  setWindIcon(data.windDirection);
  const temperature = convertTemperature(data.temperature);
  document.getElementById("city").innerHTML = data.location;
  document.getElementById("weatherID").innerHTML = data.weatherID;
  document.getElementById("temp").innerHTML = temperature;
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
