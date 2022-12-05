// global variables
let APIKey = "ee59ede244e33ed170daddc9ed9c6ab4";
let cityName = document.querySelector("#user-input");

let searchDiv = document.querySelector("#search");
let searchBtn = document.querySelector("#search-btn");
let cityDiv = document.querySelector("#city-weather");
let forecastDiv = document.querySelector("#forecast");
let historyDiv = document.querySelector("#past-searches");

let history = JSON.parse(localStorage.getItem("cities")) || [];

// functions
function init() {}

function getWeather(event) {
  let city = cityName.value;
  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;
  cityDiv.innerHTML = "";
  forecastDiv.innerHTML = "";
  event.preventDefault();
  fetch(forecastURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("data", data);
      // Current City Weather
      let iconURL = `https://api.openweathermap.org/img/w/${data.list[0].weather[0].icon}`;
      cityDiv.innerHTML += `<h1>${data.city.name}</h1> <img src="${iconURL}" alt="">`;
      cityDiv.innerHTML += data.list[0].dt_txt.split(" ")[0];
      cityDiv.innerHTML += `Temperature: ${data.list[0].main.temp}`;
      cityDiv.innerHTML += `Wind: ${data.list[0].wind.speed}MPH`;
      cityDiv.innerHTML += `Humidity: ${data.list[0].main.humidity}%`;
      // 5-Day Forecast
      data.list.forEach((timeSec, index) => {
        let time = data.list[index].dt_txt.split(" ")[1];
        let date = data.list[index].dt_txt.split(" ")[0];
        if (time === "00:00:00") {
          let iconURL = `https://api.openweathermap.org/img/w/${data.list[index].weather[0].icon}`;
          forecastDiv.innerHTML += `<img src="${iconURL}" alt="">`;
          forecastDiv.innerHTML += `<h2>${date}</h2>`;
          forecastDiv.innerHTML += `<h2>Temperature: ${data.list[index].main.temp}</h2>`;
          forecastDiv.innerHTML += `<h2>Wind: ${data.list[0].wind.speed} MPH</h2>`;
          forecastDiv.innerHTML += `<h2>Humidity: ${data.list[0].main.humidity} %</h2>`;
        }
      });
    });
}

function displayHistory() {
  // show past searches
}

// event listeners
searchBtn.addEventListener("click", getWeather);
