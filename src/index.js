import UI from './ui';
import './styles.css';

let defaultLocation = 'Miami';
let storedLocation = localStorage.getItem('storedLocation');
storedLocation = JSON.parse(storedLocation) || defaultLocation;

let darkMode = false;
let storedDarkMode = localStorage.getItem('storedDarkMode');
storedDarkMode = JSON.parse(storedDarkMode) || JSON.stringify(darkMode);

if (storedDarkMode === true) {
  document.querySelector('body').classList.add('dark');
}

document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const city = document.querySelector('input').value;
  window.localStorage.setItem('storedLocation', JSON.stringify(city));
  getWeatherData(city);
});

document
  .getElementById('dark-mode-button')
  .addEventListener('click', function (e) {
    UI.toggleDarkMode();
  });

async function getWeatherData(location) {
  const requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=e39170d30aebc36d04505fbbfd50451c
    `;
  let responseData;
  let response;
  try {
    response = await fetch(requestURL, {
      mode: 'cors',
    });

    if (response.status === 404) {
      throw 'Error getting weather data';
    }

    responseData = await response.json();
    let weatherObject = parseWeatherData(responseData);
    UI.updateUI(weatherObject);
  } catch (err) {
    UI.showInvalidLocation();
  }
}

function parseWeatherData(dataJSON) {
  let weatherObject = {
    cityName: dataJSON.name,
    kelvin: dataJSON['main']['temp'],
    feelsKelvin: dataJSON['main']['feels_like'],
    fahrenheit: toFahr(dataJSON['main']['temp']),
    feelsFahrenheit: toFahr(dataJSON['main']['feels_like']),
    celsius: toCels(dataJSON['main']['temp']),
    feelsCelsius: toCels(dataJSON['main']['feels_like']),
    description: dataJSON['weather'][0]['description'],
    main: dataJSON['weather'][0]['main'],
    wind: dataJSON['wind']['speed'],
    humidity: dataJSON['main']['humidity'],
    clouds: dataJSON['clouds']['all'],
  };
  return weatherObject;
}

function toFahr(kelv) {
  return Math.round(1.8 * (kelv - 273) + 32);
}

function toCels(kelv) {
  return Math.round(kelv - 273.15);
}

getWeatherData(storedLocation);
