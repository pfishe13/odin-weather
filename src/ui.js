import Weather from './weather';

const UI = (() => {
  let celsius = false;

  const toggleCelsius = () => {
    celsius = !celsius;
  };

  const updateUI = (weatherObject) => {
    console.log(`The name of the city is ${weatherObject['cityName']}`);
    updateBackgroundImage(weatherObject['main']);
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

  const updateBackgroundImage = (condition) => {
    console.log('Updating background');
  };

  const updateCityHeader = (city) => {
    const cityHeader = document.getElementById('city-header');
    console.log(cityHeader);
    cityHeader.textContent = city;
  };

  const updateLeftSideData = (temp) => {
    const leftHeader = document.getElementById('temperature');
    leftHeader.textContent = `${temp}\xB0`;
  };

  const updateRightSideData = (description, feelsTemp, humidity, wind) => {
    clearRightSide();

    const rightContainer = document.getElementById('box');

    const descriptionContainer = document.getElementById('top');
    descriptionContainer.lastChild.remove();
    const descriptionHeader = document.createElement('h3');
    descriptionHeader.textContent = description;
    descriptionContainer.appendChild(descriptionHeader);
    descriptionContainer.classList.add('float-container');

    const feelsTempContainer = document.createElement('div');
    const feelsTempHeader = document.createElement('h4');
    feelsTempHeader.textContent = `Feels Like`;
    const feelsTempData = document.createElement('h4');
    feelsTempData.textContent = `${feelsTemp}\xB0`;
    feelsTempContainer.appendChild(feelsTempHeader);
    feelsTempContainer.appendChild(feelsTempData);
    feelsTempContainer.classList.add('float-container');

    const humidityContainer = document.createElement('div');
    const humidityHeader = document.createElement('h4');
    humidityHeader.textContent = `Humidity`;
    const humidityData = document.createElement('h4');
    humidityData.textContent = `${humidity}%`;
    humidityContainer.appendChild(humidityHeader);
    humidityContainer.appendChild(humidityData);
    humidityContainer.classList.add('float-container');

    const windContainer = document.createElement('div');
    const windHeader = document.createElement('h4');
    windHeader.textContent = `Wind`;
    const windData = document.createElement('h4');
    windData.textContent = `${wind} MPH`;
    windContainer.appendChild(windHeader);
    windContainer.appendChild(windData);
    windContainer.classList.add('float-container');

    rightContainer.appendChild(descriptionContainer);
    rightContainer.appendChild(feelsTempContainer);
    rightContainer.appendChild(humidityContainer);
    rightContainer.appendChild(windContainer);
  };

  const clearRightSide = () => {
    const rightside = document.getElementById('box');
    for (let i = 0; i < 3; i += 1) {
      rightside.lastChild.remove();
    }
  };

  return { updateUI, toggleCelsius };
})();

export default UI;
