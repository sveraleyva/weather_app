// global variables
let APIKey = "ee59ede244e33ed170daddc9ed9c6ab4";
let city = "Chicago";
let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

let searchDiv = document.querySelector("#search");
let searchBtn = document.querySelector("#search-btn");
let cityDiv = document.querySelector("#city-weather");
let forecastDiv = document.querySelector("#forecast");
let pastSearchesDiv = document.querySelector("#past-searches");

// functions
function getWeather(event) {
  event.preventDefault();
  console.log("getWeather activated");
  fetch(forecastURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("data", data);
      // name
      currentCity.innerHTML = data.city.name;
      currentDate.innerHTML = data.list[0].dt_txt;
      currentIcon.classList.add(data.list[0].weather[0].icon);
      currentTemp.innerHTML = `Temperature: ${data.list[0].main.temp}`;
      currentWind.innerHTML = `Wind: ${data.list[0].wind.speed}MPH`;
      currentHum.innerHTML = `Humidity: ${data.list[0].main.humidity}%`;
      // 5-day forecast
    });
}

// event listeners
searchBtn.addEventListener("click", getWeather);
