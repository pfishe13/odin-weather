import Weather from './weather';

const UI = (() => {
  let celsius = false;

  const toggleCelsius = () => {
    celsius = !celsius;
  };

  const updateUI = (weatherObject) => {
    console.log(`The name of the city is ${weatherObject['cityName']}`);
    // updateBackgroundImage();
    updateCityHeader(weatherObject['cityName']);
    celsius
      ? updateLeftSideData(weatherObject['celsius'])
      : updateLeftSideData(weatherObject['fahrenheit']);

    const feelsTemp = celsius
      ? weatherObject['feelsCelsius']
      : weatherObject['feelsFahrenheit'];

    updateRightSideData(
      weatherObject['description'],
      feelsTemp,
      weatherObject['humidity'],
      weatherObject['wind']
    );
  };

  const updateCityHeader = (city) => {
    const cityHeader = document.getElementById('city-header');
    console.log(cityHeader);
    cityHeader.textContent = city;
  };

  const updateLeftSideData = (temp) => {
    const leftHeader = document.getElementById('temperature');
    leftHeader.textContent = temp;
  };

  const updateRightSideData = (description, feelsTemp, humidity, wind) => {
    const rightContainer = document.getElementById('details');

    const descriptionContainer = document.createElement('div');
    const descriptionHeader = document.createElement('h3');
    descriptionHeader.textContent = description;
    descriptionContainer.appendChild(descriptionHeader);

    const feelsTempContainer = document.createElement('div');
    const feelsTempHeader = document.createElement('h4');
    feelsTempHeader.textContent = `Feels Like`;
    const feelsTempData = document.createElement('h4');
    feelsTempData.textContent = feelsTemp;
    feelsTempContainer.appendChild(feelsTempHeader);
    feelsTempContainer.appendChild(feelsTempData);

    const humidityContainer = document.createElement('div');
    const humidityHeader = document.createElement('h4');
    humidityHeader.textContent = `Humidity`;
    const humidityData = document.createElement('h4');
    humidityData.textContent = `${humidity}%`;
    humidityContainer.appendChild(humidityHeader);
    humidityContainer.appendChild(humidityData);

    const windContainer = document.createElement('div');
    const windHeader = document.createElement('h4');
    windHeader.textContent = `Wind`;
    const windData = document.createElement('h4');
    windData.textContent = `${wind} MPH`;
    windContainer.appendChild(windHeader);
    windContainer.appendChild(windData);

    rightContainer.appendChild(descriptionContainer);
    rightContainer.appendChild(feelsTempContainer);
    rightContainer.appendChild(humidityContainer);
    rightContainer.appendChild(windContainer);
  };

  return { updateUI, toggleCelsius };
})();

export default UI;
