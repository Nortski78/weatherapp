import { subscribe } from "./pubsub.js";
import { convertKelvinToCelcius, convertKelvinToFahrenheit, convertCelciusToFahrenheit, convertFahrenheitToCelcius, mpsToMph, kphToMph, mphToKph } from "./utilityfunctions.js";

export function initWeatherDetails() {};

subscribe('weatherfetched', (data) => {
    updateWeatherDetails(data);
});
subscribe('tempunitchanged', (unit) => changeUnit(unit));

// Variables
let unit = 'C';
let windSpeedUnit = 'mph';

// Cache the DOM
const feelsLike = document.querySelector('#feels-like');
const humidity = document.querySelector('#humidity');
const rain = document.querySelector('#chance-of-rain');
const wind = document.querySelector('#wind-speed');

// Events
wind.addEventListener('click', changeWindSpeedUnit);

function updateWeatherDetails(data) {
    if (unit === 'C') feelsLike.textContent = `${convertKelvinToCelcius(data.current.feels_like)} \u00B0${unit}`;
    else if (unit === 'F') feelsLike.textContent = `${convertKelvinToFahrenheit(data.current.feels_like)} \u00B0${unit}`;
    humidity.textContent = `${data.current.humidity} %`;
    rain.textContent = `${data.daily[0].pop * 100} %`;
    wind.textContent = `${mpsToMph(data.current.wind_speed)} ${windSpeedUnit}`;
}

function changeUnit(tempUnit) {
    if(tempUnit === 'F') {
      unit = 'F';
      feelsLike.textContent = `${convertCelciusToFahrenheit(feelsLike.textContent.split(' ')[0])} \u00B0${unit}`;
      return
    }
    if(tempUnit === 'C') {
      unit = 'C';
      feelsLike.textContent = `${convertFahrenheitToCelcius(feelsLike.textContent.split(' ')[0])} \u00B0${unit}`;
      return
    }
  }

  function changeWindSpeedUnit() {
    if(windSpeedUnit === 'mph') {
      wind.textContent = `${mphToKph(wind.textContent.split(' ')[0])} kph`;
      windSpeedUnit = 'kph';
      return
    }
    if(windSpeedUnit === 'kph') {
      wind.textContent = `${kphToMph(wind.textContent.split(' ')[0])} mph`;
      windSpeedUnit = 'mph';
      return
    }
  }