import { subscribe } from "./pubsub.js";
import { convertKelvinToCelcius, convertCelciusToFahrenheit, convertFahrenheitToCelcius } from "./utilityfunctions.js";

export function initWeatherDetails() {};

subscribe('weatherfetched', (data) => {
    updateWeatherDetails(data);
});
subscribe('tempunitchanged', (unit) => changeUnit(unit));

// Cache the DOM
const feelsLike = document.querySelector('#feels-like');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');

function updateWeatherDetails(data) {
    feelsLike.textContent = `${convertKelvinToCelcius(data.main.feels_like)}`;
    humidity.textContent = data.main.humidity;
    wind.textContent = data.wind.speed;
}

function changeUnit(unit) {
    if(unit === 'F') {
      //feelsLike.textContent = 'Display \u00B0C';
      feelsLike.textContent = `${convertCelciusToFahrenheit(feelsLike.textContent.split(' ')[0])} \u00B0${unit}`;
      return
    }
    if(unit === 'C') {
     // tempType.textContent = 'Display \u00B0F';
      //unit = 'C';
      feelsLike.textContent = `${convertFahrenheitToCelcius(feelsLike.textContent.split(' ')[0])} \u00B0${unit}`;
      return
    }
  }