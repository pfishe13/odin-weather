import Weather from './weather';
import UI from './ui';
import './styles.css';

function newLocation(city) {
  let yeah = Weather(city);
  yeah.setData();
  // console.log(yeah);
  return yeah;
}

let yup = newLocation('Akron');

console.log('UI updating', yup);
UI.updateUI(yup);
