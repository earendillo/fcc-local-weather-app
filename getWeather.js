"use strict";

const request = (method, url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = resolve;
    xhr.onerror = reject;
    xhr.send();
  });
};

const coordinates = [];
const coordinatesAPI = "http://ip-api.com/json";

const getWeather = request('GET', coordinatesAPI)
  .then(event => {
    const data = JSON.parse(event.target.response);
    coordinates[0] = data.lat;
    coordinates[1] = data.lon;
  })

   .then(() => {
     const weatherAPI = `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=3da6a7c77deb9c2ba46c840f36a5dc0f`;
     return request('GET', weatherAPI);
   })

   .then(event => {
     const data = JSON.parse(event.target.response);
     const weatherID =  data.weather[0].id;
     const weatherClass = "wi wi-owm-";
     const weatherClassName = weatherClass + weatherID;
     const windClass = "wi wi-wind from-";
     const windClassComplement = "-deg";
     const windDirection = data.wind.deg;
     const windClassName = windClass + windDirection + windClassComplement;
     const weatherIcon = document.createElement("I");
           weatherIcon.className = weatherClassName;
     const windIcon = document.createElement("I");
           windIcon.className = windClassName;

         document.getElementById("city").innerHTML = data.name;
         document.getElementById("weatherID").innerHTML = data.weather[0].main;
         document.getElementById("temp").innerHTML = (data.main.temp - 273).toFixed(1);
         document.getElementById("press").innerHTML = data.main.pressure;
         document.getElementById("humid").innerHTML = data.main.humidity;
         document.getElementById("windSpeed").innerHTML = data.wind.speed;
         document.getElementById("weatherIcon").appendChild(weatherIcon);
         document.getElementById("windIcon").appendChild(windIcon);
   })

   .catch(error => {
     console.log(error);
   });
