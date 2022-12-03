import { publish } from "./pubsub.js";

const key = '0c77845f3651315e00fbb2744fda7ee0';

export async function getWeather(location) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${key}`);
  const weatherData = await response.json();
  publish('weatherFetched', weatherData);
}