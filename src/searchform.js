import { subscribe } from "./pubsub.js";
import { getWeather } from "./openweather.js";

export function initForm() {}

subscribe('weatherFetched', (data) => {console.log(data)});
subscribe('searchfailed', (data) => {error(data)});

// Init variables
const weatherData = {};

// Cache the DOM
const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const errorMsg = document.querySelector('#form-error-msg');

// Event listeners
searchInput.addEventListener('invalid', fail);
form.addEventListener('submit', validate);

// Methods
function fail(e) {
  const field = e.target;
  console.error(`${field.id} is INVALID`);
  console.log(field.validity);

  if(field.validity.tooShort) {
    errorMsg.textContent = '';
    errorMsg.textContent = 'Search input must be 3 characters or more.';
    return;
  }
  if(field.validity.patternMismatch) {
    errorMsg.textContent = '';
    errorMsg.textContent = 'Search can only contain letters';
    return;
  }
}

function validate(e) {
  e.preventDefault();
  const inputs = document.querySelectorAll('form input[type=text]');

  errorMsg.textContent = '';

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

function error(err) {
  errorMsg.textContent = '';
  errorMsg.textContent = err;
}