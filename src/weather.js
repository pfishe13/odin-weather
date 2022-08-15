const Weather = (location) => {
  let city = location;
  let data = {};

  async function setData() {
    const requestURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e39170d30aebc36d04505fbbfd50451c
    `;
    const request = new Request(requestURL);
    const response = await fetch(requestURL, {
      mode: 'cors',
    });
    const responseData = await response.json();
    console.log(responseData);
    parseWeatherData(responseData);
  }

  function parseWeatherData(dataJSON) {
    data.cityName = dataJSON.name;
    data.kelvin = dataJSON['main']['temp'];
    data.feelsKelvin = dataJSON['main']['feels_like'];
    data.fahrenheit = toFahr(data.kelvin);
    data.feelsFahrenheit = toFahr(data.feelsKelvin);
    data.celsius = toCels(data.kelvin);
    data.feelsCelsius = toFahr(data.feelsKelvin);
    data.description = dataJSON['weather'][0]['description'];

    console.log(data);
  }

  function toFahr(kelv) {
    return Math.round(1.8 * (kelv - 273) + 32);
  }

  function toCels(kelv) {
    return Math.round(kelv - 273.15);
  }

  function getCity() {
    console.log(`Returning ${data.cityName}`);
    return data.cityName;
  }

  return { data, setData, getCity };
};

export default Weather;
