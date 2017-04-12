function request(method, url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = resolve;
    xhr.onerror = reject;
    xhr.send();
  });
};

const coordinates = [];
const coordinatesAPI = "http://ip-api.com/json";
const myRequest = request('GET', coordinatesAPI)
  .then(function(event) {
    let data = JSON.parse(event.target.response);
    coordinates[0] = (data.lat);
    coordinates[1] = (data.lon);
    return coordinates;
   })


   .then(function(event) {
     const weatherAPI = "http://api.openweathermap.org/data/2.5/weather?lat=" + coordinates[0].toString() + "&lon=" + coordinates[1].toString() + "&appid=3da6a7c77deb9c2ba46c840f36a5dc0f";
     return request('GET', weatherAPI);
   })

   .then(function(event) {
     let data = JSON.parse(event.target.response);
     console.log(data.weather[0].id);
     //var data = JSON.parse(result);
     console.log(data);
     var weatherID =  data.weather[0].id;
     var weatherClass = "wi wi-owm-";
     var weatherClassName = weatherClass + weatherID;
     var windClass = "wi wi-wind from-";
     var windClassComplement = "-deg";
     var windDirection = data.wind.deg;
     var windClassName = windClass + windDirection + windClassComplement;
     var weatherIcon = document.createElement("I");
     weatherIcon.className = weatherClassName;
     var windIcon = document.createElement("I");
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


// const writeWeather = function(result) {
//
//    		var data = JSON.parse(result);
//    		console.log(data);
//    		var weatherID =  data.weather[0].id;
//    		var weatherClass = "wi wi-owm-";
//    		var weatherClassName = weatherClass + weatherID;
//    		var windClass = "wi wi-wind from-";
//    		var windClassComplement = "-deg";
//    		var windDirection = data.wind.deg;
//    		var windClassName = windClass + windDirection + windClassComplement;
//    		var weatherIcon = document.createElement("I");
//    		weatherIcon.className = weatherClassName;
//    		var windIcon = document.createElement("I");
//    		windIcon.className = windClassName;
//
//    		    document.getElementById("city").innerHTML = data.name;
//    		    document.getElementById("weatherID").innerHTML = data.weather[0].main;
//    		    document.getElementById("temp").innerHTML = (data.main.temp - 273).toFixed(1);
//    		    document.getElementById("press").innerHTML = data.main.pressure;
//    		    document.getElementById("humid").innerHTML = data.main.humidity;
//    				document.getElementById("windSpeed").innerHTML = data.wind.speed;
//            document.getElementById("weatherIcon").appendChild(weatherIcon);
//            document.getElementById("windIcon").appendChild(windIcon);
//
//    };





// console.log(weatherAPI);
// return request('GET', weatherAPI);
//
// function getData(x) {
//   document.write(x);
// }
// console.log("coords are: " + coordinates);
