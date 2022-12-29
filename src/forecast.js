import { subscribe } from "./pubsub.js";
import { DateTime } from "./libs/luxon.js";
import { convertKelvinToCelcius, convertKelvinToFahrenheit, convertCelciusToFahrenheit, convertFahrenheitToCelcius } from "./utilityfunctions.js";

export function initForecast() {};

subscribe('weatherfetched', (data) => {
    updateForecast(data);
})

subscribe('tempunitchanged', (unit) => changeUnit(unit));

// Cache DOM
const dailyContainer = document.querySelector('#forecast-daily-container');
const hourlyContainer = document.querySelector('#forecast-hourly-container');
const dayCollection = document.querySelectorAll('.forecast-daily');
const hourCollection = document.querySelectorAll('.forecast-hourly');
const navBtns = document.querySelector('#hourly-btn-container');
const dailyBtn = document.querySelector(".daily-btn");
const hourlyBtn = document.querySelector(".hourly-btn");
const leftBtn = document.querySelector('#left-btn');
const rightBtn = document.querySelector('#right-btn');
const dot1 = document.querySelector('#dot1-btn');
const dot2 = document.querySelector('#dot2-btn');
const dot3 = document.querySelector('#dot3-btn');

// Init variables
let unit = 'C';
let hourContainer = 1;

// Event listeners
dailyBtn.addEventListener('click', displayDailyForecast);
hourlyBtn.addEventListener('click', displayHourlyForecast);
leftBtn.addEventListener('click', () => {updateHourlyForecastDisplay('left-btn')});
rightBtn.addEventListener('click', () => {updateHourlyForecastDisplay('right-btn')});
dot1.addEventListener('click', () => {updateHourlyForecastDisplay('dot1-btn')});
dot2.addEventListener('click', () => {updateHourlyForecastDisplay('dot2-btn')});
dot3.addEventListener('click', () => {updateHourlyForecastDisplay('dot3-btn')});

function updateForecast(data) {

    // Get today's day and hour number
    let dayNumber = DateTime.now().weekday;
    let dtTime = DateTime.now().toObject();
    let hour = dtTime.hour;

    // Display daily forecast
    for(let i = 0; i < dayCollection.length; ++i) {
        const day = dayCollection[i].querySelector('.daily-day');
        const dailyHigh = dayCollection[i].querySelector('.daily-high');
        const dailyLow = dayCollection[i].querySelector('.daily-low');
        const icon = dayCollection[i].querySelector('.daily-icon');


        switch(dayNumber) {
            case 1:
                day.textContent = 'Tuesday';
                break;
            case 2:
                day.textContent = 'Wednesday';
                break;
            case 3:
                day.textContent = 'Thursday';
                break;
            case 4:
                day.textContent = 'Friday';
                break;
            case 5:
                day.textContent = 'Saturday';
                break;
            case 6:
                day.textContent = 'Sunday';
                break;
            case 7:
                day.textContent = 'Monday';
                
        }

        if (unit === 'C') {
            dailyHigh.textContent = `${convertKelvinToCelcius(data.daily[i].temp.max)} \u00B0${unit}`;
            dailyLow.textContent = `${convertKelvinToCelcius(data.daily[i].temp.min)} \u00B0${unit}`;
        } else if (unit === 'F') {
            dailyHigh.textContent = `${convertKelvinToFahrenheit(data.daily[i].temp.max)} \u00B0${unit}`;
            dailyLow.textContent = `${convertKelvinToFahrenheit(data.daily[i].temp.min)} \u00B0${unit}`;
        }

        if (dayNumber == 7) dayNumber = 1;
        else ++dayNumber;

        icon.src = `http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`;
    }

    // Display hourly forecast
    for (let i = 0; i < hourCollection.length; ++i) {

        const time = hourCollection[i].querySelector('.hourly-time');
        const temp = hourCollection[i].querySelector('.hourly-temp');
        const icon = hourCollection[i].querySelector('.hourly-icon');

        if (hour == 24) hour = 0;
        time.textContent = `${addOneToHour(hour)}`;
        ++hour;

        if (unit === 'C') {
            temp.textContent = `${convertKelvinToCelcius(data.hourly[i].temp)} \u00B0${unit}`;
        } else if (unit === 'F') {
            temp.textContent = `${convertKelvinToFahrenheit(data.hourly[i].temp)} \u00B0${unit}`;
        }

        icon.src = `http://openweathermap.org/img/w/${data.hourly[i].weather[0].icon}.png`;
    }
}

function changeUnit(tempUnit) {
    const tempCollection = document.querySelectorAll('.daily-temp, .hourly-temp');

    for (let i = 0; i < tempCollection.length; ++i) {
        if( tempUnit === 'F') {
            unit = 'F';
            tempCollection[i].textContent = `${convertCelciusToFahrenheit(tempCollection[i].textContent.split(' ')[0])} \u00B0${unit}`;            
        } else if( tempUnit === 'C' ){
            unit = 'C';
            tempCollection[i].textContent = `${convertFahrenheitToCelcius(tempCollection[i].textContent.split(' ')[0])} \u00B0${unit}`;
        }
    }
}

function displayDailyForecast() {
    dailyBtn.classList.add('forecast-selected');
    hourlyBtn.classList.remove('forecast-selected');
    dailyContainer.classList.remove('hidden');
    hourlyContainer.classList.add('hidden');
    navBtns.classList.add('hidden');
}

function displayHourlyForecast() {
    dailyBtn.classList.remove('forecast-selected');
    hourlyBtn.classList.add('forecast-selected');
    hourlyContainer.classList.remove('hidden');
    dailyContainer.classList.add('hidden');
    navBtns.classList.remove('hidden');
}

function updateHourlyForecastDisplay(btn) {
    console.log(btn);
    switch(btn) {
        case "left-btn":
            if (hourContainer === 1) return;
            --hourContainer;
            displayHourlyContainer(hourContainer);
            break;
        case "right-btn":
            if (hourContainer === 3) return;
            ++hourContainer;
            displayHourlyContainer(hourContainer);
            break;
        case "dot1-btn":
            hourContainer = 1;
            displayHourlyContainer(hourContainer);
            break;
        case "dot2-btn":
            hourContainer = 2;
            displayHourlyContainer(hourContainer);
            break;
        case "dot3-btn":
            hourContainer = 3;
            displayHourlyContainer(hourContainer);
            break;
    }
}

function displayHourlyContainer(hour) {
    const container1 = document.querySelector("#hourly-container-1");
    const container2 = document.querySelector("#hourly-container-2");
    const container3 = document.querySelector("#hourly-container-3");
    
    switch(hour) {
        case 1:
            container1.classList.remove('hidden');
            container2.classList.add('hidden');
            container3.classList.add('hidden');
            dot1.classList.add('fill');
            dot2.classList.remove('fill');
            dot3.classList.remove('fill');
            break;
        case 2:
            container1.classList.add('hidden');
            container2.classList.remove('hidden');
            container3.classList.add('hidden');
            dot1.classList.remove('fill');
            dot2.classList.add('fill');
            dot3.classList.remove('fill');
            break;
        case 3:
            container1.classList.add('hidden');
            container2.classList.add('hidden');
            container3.classList.remove('hidden');
            dot1.classList.remove('fill');
            dot2.classList.remove('fill');
            dot3.classList.add('fill');
            break;
    }
}

function addOneToHour(hour)
{
  hour = (hour + 1) % 24;

  if(hour < 12)
    return hour + " am";

  return (hour - 12) + " pm";
}