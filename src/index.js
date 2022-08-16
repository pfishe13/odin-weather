import UI from './ui';
import './styles.css';

let defaultLocation = 'Miami';

async function getWeatherData(location) {
  const requestURL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=e39170d30aebc36d04505fbbfd50451c
    `;
  const request = new Request(requestURL);
  const response = await fetch(requestURL, {
    mode: 'cors',
  });
  const responseData = await response.json();
  console.log(responseData);
  let weatherObject = parseWeatherData(responseData);
  UI.updateUI(weatherObject);
}

function parseWeatherData(dataJSON) {
  let weatherObject = {
    cityName: dataJSON.name,
    kelvin: dataJSON['main']['temp'],
    feelsKelvin: dataJSON['main']['feels_like'],
    fahrenheit: toFahr(dataJSON['main']['temp']),
    feelsFahrenheit: toFahr(dataJSON['main']['feels_like']),
    celsius: toCels(dataJSON['main']['temp']),
    feelsCelsius: toFahr(dataJSON['main']['feels_like']),
    description: dataJSON['weather'][0]['description'],
    main: dataJSON['weather'][0]['main'],
    wind: dataJSON['wind']['speed'],
    humidity: dataJSON['main']['humidity'],
  };
  console.log(weatherObject);
  return weatherObject;
}

function toFahr(kelv) {
  return Math.round(1.8 * (kelv - 273) + 32);
}

function toCels(kelv) {
  return Math.round(kelv - 273.15);
}

getWeatherData(defaultLocation);
