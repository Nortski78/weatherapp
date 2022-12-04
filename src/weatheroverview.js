import { subscribe } from "./pubsub.js";
import { DateTime } from "./libs/luxon.js";
import { convertKelvinToCelcius, convertKelvinToFahrenheit, convertCelciusToFahrenheit, convertFahrenheitToCelcius, capitaliseWords } from "./utilityfunctions.js";

export function initOverview() {};

subscribe('weatherFetched', (data) => {
  updateOverview(data);
});

// Init variables
let unit = 'C';

// Format a new date
const currentDate = DateTime.now();
let newFormat = {...DateTime.DATE_HUGE, weekday: 'long' };

// Cache the DOM
const weatherType = document.querySelector('#weather-type');
const location = document.querySelector('#location');
const date = document.querySelector('#date');
const time = document.querySelector('#time');
const temp = document.querySelector('#temp');
const tempType = document.querySelector('#units'); 

// Event listeners
tempType.addEventListener('click', changeUnit);

function updateOverview(data) {

  let kelvin = data.main.temp;

  weatherType.textContent = capitaliseWords(data.weather[0].description);
  location.textContent = data.name;
  date.textContent = currentDate.toLocaleString(newFormat);
  time.textContent = currentDate.toLocaleString(DateTime.TIME_SIMPLE);
  temp.textContent = `${unit == 'C' ? convertKelvinToCelcius(kelvin) : convertKelvinToFahrenheit(kelvin)} \u00B0${unit}`;
}

function changeUnit() {
  if(unit === 'C') {
    tempType.textContent = 'Display \u00B0C';
    unit = 'F';
    temp.textContent = `${convertCelciusToFahrenheit(temp.textContent.split(' ')[0])} \u00B0${unit}`;
    return
  }
  if(unit === 'F') {
    tempType.textContent = 'Display \u00B0F';
    unit = 'C';
    temp.textContent = `${convertFahrenheitToCelcius(temp.textContent.split(' ')[0])} \u00B0${unit}`;
    return
  }
}