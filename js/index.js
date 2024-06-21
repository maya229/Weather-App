var searchBar = document.querySelector('#search');
var day = document.querySelector('.day');
var day2 = document.querySelector('.day2');
var day3 = document.querySelector('.day3');
var locationElement = document.querySelector('.location');
var num = document.querySelector('.num');
var maxNum = document.querySelector('.max-num');
var maxNum3 = document.querySelector('.max-num3');
var custom = document.querySelector('#custom');
var custom2 = document.querySelector('#custom2');
var icon = document.querySelector('.icon2');
var custom3 = document.querySelector('#custom3');
var icon3 = document.querySelector('.icon3');
var keyArray = [];
// var weatherDataArray = [];
var weatherDatalocation = [];
var weatherDataCurrent = [];
var weatherDataCondition = [];
var forecastday = [];
var weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];
var monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
getWeather('Egypt');
searchBar.addEventListener('keyup', function (e) {
    var x = e.key;
    if (e.key.length === 1) {
        keyArray.push(x);
    } else if (e.key === 'Backspace') {
        keyArray.pop();
    }
    var inputString = keyArray.join('');

    getWeather(inputString);
})
var date;

async function getWeather(location) {
    try {
        var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b2936a5beded4165933193215242006&q=${location}&days=3`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        var weatherData = await response.json();
        weatherDatalocation = weatherData.location;
        weatherDataCurrent = weatherData.current;
        weatherDataCondition = weatherData.current.condition;
        forecastday = weatherData.forecast.forecastday;
        date = new Date(weatherDatalocation.localtime);
        displayData();

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayData() {
    for (i = 0; i < weekDays.length; i++) {
        if (date.getDay() == i + 1) {
            day.innerHTML = weekDays[i];
        }
    }
    for (i = 0; i < monthNames.length; i++) {
        if (date.getMonth() == i) {
            day.nextElementSibling.innerHTML = date.getDate() + monthNames[i];
        }
    }
    locationElement.innerHTML = weatherDatalocation.name;
    num.innerHTML = `${weatherDataCurrent.temp_c}<sup>o</sup>C`;
    num.nextElementSibling.firstElementChild.setAttribute('src', weatherDataCondition.icon);
    custom.innerHTML = weatherDataCondition.text;

    display(1);
    display(2);


}
function display(index) {

    for (i = 0; i < weekDays.length; i++) {
        var dayElement = (index === 2) ? day3 : day2;
        var maxNumElement = (index === 2) ? maxNum3 : maxNum;
        var iconElement = (index === 2) ? icon3 : icon;
        var customElement = (index === 2) ? custom3 : custom2;
        var date2 = new Date(forecastday[index].date);
        var dayNumber = (date2.getDay() === 0) ? 0 : i + 1;
        if (date2.getDay() == dayNumber) {
            dayElement.innerHTML = weekDays[i];
        }
    }
    maxNumElement.innerHTML = `${forecastday[index].day.maxtemp_c}<sup>o</sup> C`;
    maxNumElement.nextElementSibling.innerHTML = `${forecastday[index].day.mintemp_c}<sup>o</sup> C`;
    console.log(icon.firstElementChild);
    iconElement.firstElementChild.setAttribute('src', forecastday[index].day.condition.icon);
    customElement.innerHTML = forecastday[index].day.condition.text;
}





