var APIKey = "09a37924adb28c1359f0c44a9ee1ddcb";
var searchBtn = document.querySelector('#search-btn')
var displayResults = document.querySelector('#display-city')
var displayForecastWeather = document.querySelector('#display-forecast')
var searchInput = document.querySelector('#search-input')
var cityName = document.querySelector('#city-name')
var weatherIcon = document.querySelector('#weather-icon')
var displayTemp = document.querySelector('#temp')
var displayWind = document.querySelector('#wind')
var displayHumidty = document.querySelector('#humidty')
var displayCurrentDate = document.querySelector('#current-date')
var pastResults = document.querySelector('#past-results')

function handleSearchClick() {
    var searchCity = searchInput.value
    var citiesFromStorage = JSON.parse(localStorage.getItem('cities')) || [];
    citiesFromStorage.push(searchCity);
    localStorage.setItem('cities', JSON.stringify(citiesFromStorage));
    getCoordinates(searchCity);
    populateFromLocalStorage();
}

function populateFromLocalStorage() {
    var citiesFromStorage = JSON.parse(localStorage.getItem('cities')) || [];
    citiesFromStorage.forEach(function (val) {
        var btnEl = document.createElement("button")
        btnEl.textContent = val
        pastResults.appendChild(btnEl)
    });
};

function getCoordinates(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            var lat = data[0].lat
            var lon = data[0].lon
            getCurrentWeather(lat, lon)
            getForecast(lat, lon)

        })
}


function displayCurrentWeather(data) {
    cityName.textContent = data.name
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    displayTemp.textContent = "Temp: " + data.main.temp + " F"
    displayWind.textContent = "Wind: " + data.wind.speed + " MPH"
    displayHumidty.textContent = "Humidity: " + data.main.humidity + "%"

}

function displayForecast(data) {
    console.log(data)
    for (let i = 0; i < 40; i += 8) {
        console.log(data.list[i])
        var dayData = data.list[i];
        var divEl = document.createElement("div");
        var inner = `
        <div>
        <p>${dayData.dt_txt}</p>
        <p>Temp: ${dayData.main.temp} F</p>
        <p>Wind: ${dayData.wind.speed} MPH</p>
        <p>Humidty: ${dayData.main.humidity} %</P> 
        <div>
        `

        divEl.innerHTML = inner;

        displayForecastWeather.appendChild(divEl);


    }



}



function getCurrentWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            displayCurrentWeather(data)

        })
}

function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            displayForecast(data)
        })
}



searchBtn.addEventListener("click", handleSearchClick)

populateFromLocalStorage();