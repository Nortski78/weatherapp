import { subscribe } from "./pubsub.js";
import { getWeather } from "./openweather.js";

export function initForm() {}

subscribe('weatherFetched', (data) => {console.log(data)});

// Init variables
const weatherData = {};

// Cache the DOM
const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const error = document.querySelector('#form-error-msg');

// Event listeners
searchInput.addEventListener('invalid', fail);
form.addEventListener('submit', validate);

// Methods


function fail(e) {
  const field = e.target;
  console.error(`${field.id} is INVALID`);
  console.log(field.validity);

  if(field.validity.tooShort) {
    error.textContent = '';
    error.textContent = 'Search input must be 3 characters or more.';
    return;
  }
  if(field.validity.patternMismatch) {
    error.textContent = '';
    error.textContent = 'Search can only contain letters';
    return;
  }
}

function validate(e) {
  e.preventDefault();
  const inputs = document.querySelectorAll('form input[type=text]');

  // Trim white space
  inputs.forEach(input => {
    input.value = input.value.trim();
  })

  // Submit form if valid
  const isValid = form.checkValidity();  
  if(isValid) {    
    getWeather(searchInput.value);
    searchInput.value = '';
  }
}