import { subscribe } from "./pubsub.js";
import { DateTime } from "./libs/luxon.js";
import { convertKelvinToCelcius, convertKelvinToFahrenheit, convertCelciusToFahrenheit, convertFahrenheitToCelcius } from "./utilityfunctions.js";

export function initForecast() {};

subscribe('weatherfetched', (data) => {
    updateForecast(data);
})

subscribe('tempunitchanged', (unit) => changeUnit(unit));

// Cache DOM
const dayCollection = document.querySelectorAll('.forecast-daily');

// Init variables
let unit = 'C';

const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];

function updateForecast(data) {

    // Get today's day
    let dayNumber = DateTime.now().weekday;

    for(let i = 0; i < dayCollection.length; ++i) {
        const day = dayCollection[i].querySelector('.daily-day');
        const dailyHigh = dayCollection[i].querySelector('.daily-high');
        const dailyLow = dayCollection[i].querySelector('.daily-low');


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
    }
}

function changeUnit(tempUnit) {
    const tempCollection = document.querySelectorAll('.daily-temp');

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