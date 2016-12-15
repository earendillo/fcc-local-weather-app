var lat;
var lon;
var conditions;
var temperature;
var pressure;
var humidity;
var city;
var weatherID;
var writeWeather = function(result) {

		var data = JSON.parse(result);
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

};

/* temperature conversion:
function celsiusToFahrenheit(temperature) {
			var fahrenheit = temperature * (9/5) + 32;
      return fahrenheit.toFixed(0);
}

function fahrenheitToCelsius(temperature) {
			var celsius = (temperature - 32) * (5/9);
      return celsius.toFixed(1);
}
*/

function localWeatherApp(callback) {
		httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) { // request is done
            if (httpRequest.status === 200) { // successfully
                callback(httpRequest.responseText); // we're calling our method
            }
        }
    };
		var coordsAPI = "http://ip-api.com/json";
    httpRequest.open('GET', coordsAPI);
    httpRequest.send();
}

localWeatherApp(function(result) {

    var data = JSON.parse(result);

    function localWeatherApp(callback) {
        httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState === 4) { // request is done
                if (httpRequest.status === 200) { // successfully
                    callback(httpRequest.responseText); // we're calling our method
                }
            }
        };
        var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?lat=" + data.lat + "&lon=" + data.lon + "&appid=3da6a7c77deb9c2ba46c840f36a5dc0f";
        httpRequest.open('GET', weatherAPI);
        httpRequest.send();
    }
    localWeatherApp(writeWeather);
});
