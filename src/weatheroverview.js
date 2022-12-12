import { publish, subscribe } from "./pubsub.js";
import { DateTime } from "./libs/luxon.js";
import { convertKelvinToCelcius, convertKelvinToFahrenheit, convertCelciusToFahrenheit, convertFahrenheitToCelcius, capitaliseWords } from "./utilityfunctions.js";

export function initOverview() {};

subscribe('weatherfetched', (data) => {
  updateOverview(data);
});

// Init variables
let unit = 'C';

// Format a new date
const currentDate = DateTime.now();
let newFormat = {...DateTime.DATE_HUGE, weekday: 'long' };

// Cache the DOM
const weatherType = document.querySelector('#weather-desc');
const location = document.querySelector('#location');
const date = document.querySelector('#date');
const time = document.querySelector('#time');
const temp = document.querySelector('#temp');
const tempType = document.querySelector('#units'); 
const mainIcon = document.querySelector('#main-weather-icon');

// Event listeners
tempType.addEventListener('click', changeUnit);

function updateOverview(data) {

  let kelvin = data.current.temp;

  weatherType.textContent = capitaliseWords(data.current.weather[0].description);
  location.textContent = data.name;
  date.textContent = currentDate.toLocaleString(newFormat);
  time.textContent = currentDate.toLocaleString(DateTime.TIME_SIMPLE);
  temp.textContent = `${unit == 'C' ? convertKelvinToCelcius(kelvin) : convertKelvinToFahrenheit(kelvin)} \u00B0${unit}`;
  mainIcon.src = `http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;
}

function changeUnit() {
  if(unit === 'C') {
    tempType.textContent = 'Display \u00B0C';
    unit = 'F';
    temp.textContent = `${convertCelciusToFahrenheit(temp.textContent.split(' ')[0])} \u00B0${unit}`;
    publish('tempunitchanged', 'F');
    return
  }
  if(unit === 'F') {
    tempType.textContent = 'Display \u00B0F';
    unit = 'C';
    temp.textContent = `${convertFahrenheitToCelcius(temp.textContent.split(' ')[0])} \u00B0${unit}`;
    publish('tempunitchanged', 'C');
    return
  }
}