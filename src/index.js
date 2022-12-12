import { initForm } from './searchform.js';
import { initOverview } from './weatheroverview.js';
import { initWeatherDetails } from './weatherdetails.js';
import { initForecast } from './forecast.js';

(function () {
  initForm();
  initOverview();
  initWeatherDetails();
  initForecast();
})();