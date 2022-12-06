// global variables
let APIKey = "ee59ede244e33ed170daddc9ed9c6ab4";
let cityName = document.querySelector("#user-input");

let btnsDiv = document.querySelector("#btns");
let searchBtn = document.querySelector("#search-btn");
let cityDiv = document.querySelector("#city-weather");
let forecastDiv = document.querySelector("#forecast");
let historyDiv = document.querySelector("#past-searches");
let displayWeather = document.querySelector("#display-weather");

let pastSearches = JSON.parse(localStorage.getItem("cities")) || [];

// functions

function init() {
  displayWeather.classList.add("hide");
  displayHistory();
}

function displayHistory() {
  // show past searches
  historyDiv.innerHTML = "";
  if (pastSearches.length > 0) {
    pastSearches.forEach((search) => {
      if (search != "") {
        let historyBtn = document.createElement("button");
        historyBtn.innerHTML = search;
        historyBtn.classList.add("historyBtn");
        historyDiv.append(historyBtn);
      }
    });
  } else {
    return;
  }
}

function getWeather(city) {
  // Reset
  cityDiv.innerHTML = "";
  forecastDiv.innerHTML = "";

  handlePastSearches(city);

  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`;
  fetch(forecastURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("data", data);
      // Current City Weather
      let iconURL = `https://api.openweathermap.org/img/w/${data.list[0].weather[0].icon}`;
      let cityBox = document.createElement("div");
      cityBox.classList.add("weatherBox");
      cityBox.innerHTML += `<h2 class="cityName">${data.city.name}</h2> <img class="icon" src="${iconURL}" alt="">`;
      cityBox.innerHTML += `<h3 class="weatherDate">${
        data.list[0].dt_txt.split(" ")[0]
      }</h3>`;
      cityBox.innerHTML += `<h3>Temperature: ${data.list[0].main.temp}</h3>`;
      cityBox.innerHTML += `<h3>Wind: ${data.list[0].wind.speed}MPH</h3>`;
      cityBox.innerHTML += `<h3>Humidity: ${data.list[0].main.humidity}%</h3>`;
      cityDiv.appendChild(cityBox);
      // 5-Day Forecast
      data.list.forEach((timeSec, index) => {
        let time = data.list[index].dt_txt.split(" ")[1];
        let date = data.list[index].dt_txt.split(" ")[0];
        if (time === "00:00:00") {
          let iconURL = `https://api.openweathermap.org/img/w/${data.list[index].weather[0].icon}`;
          let forecastBox = document.createElement("div");
          forecastBox.classList.add("weatherBox");
          forecastBox.innerHTML += `<h3 class="forecastDate">${date}</h3> <img class="forecastIcon" src="${iconURL}" alt="">`;
          forecastBox.innerHTML += `<h3 class="forecastInfo">Temperature: ${data.list[index].main.temp}</h3>`;
          forecastBox.innerHTML += `<h3 class="forecastInfo">Wind: ${data.list[0].wind.speed} MPH</h3>`;
          forecastBox.innerHTML += `<h3 class="forecastInfo">Humidity: ${data.list[0].main.humidity} %</h3>`;
          forecastDiv.appendChild(forecastBox);
        }
      });
    });
  // Show
}

function handlePastSearches(city) {
  // how do I check that there's actually a city that you can search for?
  // if the city is already in the array, don't want it again
  if (pastSearches.includes(city) === false) {
    pastSearches.push(city);
    console.log("pastSearches in handlePastSearches - false", pastSearches);
    localStorage.setItem("cities", JSON.stringify(pastSearches));
  }
}

// event listener
init();
btnsDiv.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("historyBtn")) {
    let cityChoice = e.target.innerHTML;
    getWeather(cityChoice);
    displayWeather.classList.remove("hide");
    displayHistory();
  } else if (e.target.classList.contains("searchBtn")) {
    let cityChoice = cityName.value;
    if (cityChoice != "") {
      getWeather(cityChoice);
      displayWeather.classList.remove("hide");
      displayHistory();
    }
  } else {
    return;
  }
});
