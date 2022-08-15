import Weather from './weather';

const UI = (() => {
  let celsius = false;

  const updateUI = (weatherObject) => {
    console.log(`The name of the city is ${weatherObject.getCity()}`);
    // updateBackgroundImage();
    updateCityHeader(weatherObject.getCity());
    // updateLeftSideData();
    // updateRightSideData();
  };

  const updateCityHeader = (city) => {
    const cityHeader = document.getElementById('city-header');
    console.log(cityHeader);
    cityHeader.textContent = city;
  };

  return { updateUI };
})();

export default UI;
