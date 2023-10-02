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
// var currentDate = dayjs().format('DD/MM/YYYY')
var displayCurrentDate = document.querySelector('#current-date')


function handleSearchClick() {
    var searchCity = searchInput.value
    var citiesFromStorage = JSON.parse(localStorage.getItem('cities')) || [];
    citiesFromStorage.push(searchCity);
    localStorage.setItem('cities', JSON.stringify(citiesFromStorage));
    getCoordinates(searchCity)
}

function populateFromLocalStorage() {
    var citiesFromStorage = JSON.parse(localStorage.getItem('cities')) || [];

};

function getCoordinates(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            // console.log(data)
            var lat = data[0].lat
            var lon = data[0].lon
            getCurrentWeather(lat, lon)
            getForecast(lat, lon)

        })
}

// function getParams() {
//     var searchParamsArr = document.location.search.split('=');


// Display current weather on webpage
function displayCurrentWeather(data) {
    cityName.textContent = data.name
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    // displayCurrentDate.textContent = currentDate
    displayTemp.textContent = "Temp: " + data.main.temp + " F"
    displayWind.textContent = "Wind: " + data.wind.speed + " MPH"
    displayHumidty.textContent = "Humidity: " + data.main.humidity + "%"

}

function displayForecast(data) {
    console.log(data)
    for (let i = 0; i < 40; i += 8) {
        console.log(data.list[i])
        displayForecastWeather.textContent = data.list.main


    }



}



function getCurrentWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            // console.log("current", data)
            displayCurrentWeather(data)

        })
}

function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            // console.log("5day", data)
            displayForecast(data)
        })
}



searchBtn.addEventListener("click", handleSearchClick)

