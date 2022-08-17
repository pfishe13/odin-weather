import Weather from './weather';

const UI = (() => {
  let celsius = false;
  let weather;

  const toggleCelsius = () => {
    celsius = !celsius;
  };

  const updateUI = (weatherObject) => {
    weather = weatherObject;
    updateBackgroundImage(weatherObject['main']);
    updateCityHeader(weatherObject['cityName']);

    setCelsiusSwitch();
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
      weatherObject['wind'],
      weatherObject['clouds']
    );
  };

  const updateBackgroundImage = (condition) => {};

  const updateCityHeader = (city) => {
    const cityHeader = document.getElementById('city-header');
    cityHeader.textContent = city;
  };

  const updateLeftSideData = (temp) => {
    const leftHeader = document.getElementById('temperature');
    leftHeader.textContent = `${temp}\xB0`;
  };

  const updateRightSideData = (
    description,
    feelsTemp,
    humidity,
    wind,
    clouds
  ) => {
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
    feelsTempHeader.innerHTML = `<span class="material-symbols-outlined">
    device_thermostat
    </span>Feels Like`;
    const feelsTempData = document.createElement('h4');
    feelsTempData.textContent = `${feelsTemp}\xB0`;
    feelsTempContainer.appendChild(feelsTempHeader);
    feelsTempContainer.appendChild(feelsTempData);
    feelsTempContainer.classList.add('float-container');
    feelsTempContainer.id = 'feels-temp';

    const humidityContainer = document.createElement('div');
    const humidityHeader = document.createElement('h4');
    humidityHeader.innerHTML = `<span class="material-symbols-outlined">
    humidity_mid
    </span>Humidity`;
    const humidityData = document.createElement('h4');
    humidityData.textContent = `${humidity}%`;
    humidityContainer.appendChild(humidityHeader);
    humidityContainer.appendChild(humidityData);
    humidityContainer.classList.add('float-container');

    const windContainer = document.createElement('div');
    const windHeader = document.createElement('h4');
    windHeader.innerHTML = `<span class="material-symbols-outlined">
    air
    </span>Wind`;
    const windData = document.createElement('h4');
    windData.textContent = `${wind} mph`;
    windContainer.appendChild(windHeader);
    windContainer.appendChild(windData);
    windContainer.classList.add('float-container');

    const cloudsContainer = document.createElement('div');
    const cloudsHeader = document.createElement('h4');
    cloudsHeader.innerHTML = `<span class="material-symbols-outlined">
    air
    </span>clouds`;
    const cloudsData = document.createElement('h4');
    cloudsData.textContent = `${clouds}%`;
    cloudsContainer.appendChild(cloudsHeader);
    cloudsContainer.appendChild(cloudsData);
    cloudsContainer.classList.add('float-container');

    rightContainer.appendChild(descriptionContainer);
    rightContainer.appendChild(feelsTempContainer);
    rightContainer.appendChild(humidityContainer);
    rightContainer.appendChild(windContainer);
    rightContainer.appendChild(cloudsContainer);
  };

  const clearRightSide = () => {
    const rightside = document.getElementById('box');
    for (let i = 0; i < 4; i += 1) {
      rightside.lastChild.remove();
    }
  };

  const setCelsiusSwitch = () => {
    const tempButton = document.getElementById('left');
    tempButton.removeEventListener('click', changeTempUnit, true);
    tempButton.addEventListener('click', changeTempUnit);
  };

  const changeTempUnit = (e) => {
    toggleCelsius();
    console.log(`clicked`);
    let displayTemp = celsius ? weather['celsius'] : weather['fahrenheit'];
    const tempContainer = document.getElementById('temperature');
    tempContainer.textContent = `${displayTemp}\xB0`;

    let displayFeelsTemp = celsius
      ? weather['feelsCelsius']
      : weather['feelsFahrenheit'];
    const feelsTempContainer = document.getElementById('feels-temp');
    const feelsTempHeader = feelsTempContainer.lastChild;
    feelsTempHeader.textContent = `${displayFeelsTemp}\xB0`;
  };

  return { updateUI, toggleCelsius };
})();

export default UI;
