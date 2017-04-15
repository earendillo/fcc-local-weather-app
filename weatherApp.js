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
  constructor(weatherID, weatherDescription, temperature, pressure, humidity, windSpeed, windDirection, location) {
    this.weatherID = weatherID;
    this.weatherDescription = weatherDescription;
    this.temperature = temperature;
    this.pressure = pressure;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.windDirection = windDirection;
    this.location = location;
  }

  convertTemperature() {
    return (this.temperature - 273).toFixed(1);
  };

  setWeatherIcon() {
    const WEATHER_CLASS = "wi wi-owm-";
    const weatherClassName = WEATHER_CLASS + this.weatherID;
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
  const weather = new Weather(data.weather[0].id, data.weather[0].description, data.main.temp, data.main.pressure, data.main.humidity, data.wind.speed, data.wind.deg, data.name);
  return weather;
};

const setWeather = (data) => {
  data.setWeatherIcon();
  data.setWindIcon();
  document.getElementById("city").innerHTML = data.location;
  document.getElementById("weatherID").innerHTML = data.weatherDescription;
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
