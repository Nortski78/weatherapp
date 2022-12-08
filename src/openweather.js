import { publish } from "./pubsub.js";

const key = '0c77845f3651315e00fbb2744fda7ee0';

export async function getWeather(location) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${key}`);

    if(response.ok) {
      const weatherData = await response.json();
      publish('weatherfetched', weatherData);
    } else {
      console.error('Fetch failed.');
    }
  } catch (err) {
    console.error(err);
  }
}