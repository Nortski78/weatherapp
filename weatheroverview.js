import { subscribe } from "./pubsub.js";

export function initOverview() {};

subscribe('weatherFetched', (data) => {
  updateOverview(data);
});

// Cache the DOM
const weatherType = document.querySelector('#weather-type');
const location = document.querySelector('#location');

function updateOverview(data) {
  weatherType.textContent = data.weather[0].main;
  location.textContent = data.name;
}