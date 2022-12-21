import { publish } from "./pubsub.js";

const key = '0c77845f3651315e00fbb2744fda7ee0';

export async function getWeather(location) {
  try {
    const coords = await convertLocationToCoords(location);
    
    if(coords == undefined) {
      publish('searchfailed', 'Location not found.');
      return;
    }
    //console.log(coords);
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,alerts&appid=${key}`);

    if(response.ok) {
      const weatherData = await response.json();
      weatherData.location = coords.loc;
      console.log(weatherData);
      publish('weatherfetched', weatherData);
    } else {
      console.error('Fetch failed.');
    }
  } catch (err) {
    console.error(err);
  }
}

async function convertLocationToCoords(location) {
  try {

    let coords = {};
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${key}`);
    
    if(response.ok) {
      const weatherData = await response.json();
      coords = {
        loc: location,
        lat: weatherData[0].lat,
        lon: weatherData[0].lon
      }
      return coords;
    } else {
      console.error('Fetch failed.');
    }
  } catch (err) {
    console.error(`Error in convertLocationToCoords: ${err}`);
  }
}