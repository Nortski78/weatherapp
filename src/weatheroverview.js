import { subscribe } from "./pubsub.js";
import { DateTime } from "./libs/luxon.js";

export function initOverview() {};

subscribe('weatherFetched', (data) => {
  updateOverview(data);
});

// Format a new date
const currentDate = DateTime.now();
var newFormat = {...DateTime.DATE_HUGE, weekday: 'long' };

// Cache the DOM
const weatherType = document.querySelector('#weather-type');
const location = document.querySelector('#location');
const date = document.querySelector('#date');
const time = document.querySelector('#time');

function updateOverview(data) {
  weatherType.textContent = data.weather[0].main;
  location.textContent = data.name;
  date.textContent = currentDate.toLocaleString(newFormat);
  time.textContent = currentDate.toLocaleString(DateTime.TIME_SIMPLE);
}