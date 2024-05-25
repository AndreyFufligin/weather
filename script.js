import { initTabs } from './tabs.js';
import { ELEMENTS } from './elements.js';
import { getData, getForecast } from './fetch.js';

initTabs();

let cityStorage = [];

const addRequest = (cityName) => {
  const data = getData(cityName);

  data.then((obj) => {
    const temper = Math.round(obj.main.temp);
    const icon = obj.weather[0].icon;
    const name = obj.name;

    let url = 'https://openweathermap.org/img/w/' + icon + '.png';

    ELEMENTS.TEMPERATURE.textContent = temper + '°';
    ELEMENTS.IMG.src = url;
    ELEMENTS.NAME_CITY.textContent = name;

    const Heartslogo = document.createElement('img');
    Heartslogo.classList.add('.now__city-img');
    Heartslogo.setAttribute('src', 'img/Hearts.svg');
    Heartslogo.addEventListener('click', (event) => {
      event.preventDefault();
      addCity(name);
    });

    ELEMENTS.NAME_CITY.append(Heartslogo);
    ELEMENTS.INPUT.value = '';
  });
};

const addRequestNow = (event) => {
  event.preventDefault();
  let cityName = ELEMENTS.INPUT.value.trim();
  if (/^[a-zA-Z]+$/.test(cityName)) {
    addRequest(cityName);
  } else {
    alert('Название города должно содержать только латинские буквы');
  }
};

ELEMENTS.SEARCH.addEventListener('click', addRequestNow);
ELEMENTS.FORM.addEventListener('submit', addRequestNow);

const addCity = (nameCity) => {
  if (!cityStorage.includes(nameCity)) {
    cityStorage.push(nameCity);
    details(nameCity);
    forecast(nameCity);
    saveCityes();
    render();
  } else {
    alert('Город уже добавлен!');
  }
};

const createElementLocation = (city) => {
  const div = document.createElement('div');
  const li = document.createElement('li');
  const btn = document.createElement('button');

  li.textContent = city;
  btn.textContent = 'X';

  div.classList.add('addedCityes');
  li.classList.add('list-item');
  btn.classList.add('delete-btn');

  div.append(li);
  div.append(btn);

  li.addEventListener('click', () => {
    addRequest(city);
    details(city);
    forecast(city);
  });

  btn.addEventListener('click', () => {
    div.remove();
    deleteLocation(city);
  });

  return div;
};

const render = () => {
  clearLists();
  cityStorage.forEach((city) => {
    const div = createElementLocation(city);
    ELEMENTS.LIST_lOCATION.append(div);
  });
};

const deleteLocation = (city) => {
  cityStorage = cityStorage.filter((cityStorage) => cityStorage !== city);
  saveCityes();
};

const clearLists = () => {
  ELEMENTS.LIST_lOCATION.innerHTML = '';
};

const saveCityes = () => {
  localStorage.setItem('city', JSON.stringify(cityStorage));
};

const loadCityes = () => {
  const savedTasks = JSON.parse(localStorage.getItem('city'));
  cityStorage = savedTasks ? savedTasks : [];
};

window.addEventListener('load', () => {
  loadCityes();
  render();
});

const details = (nameCity) => {
  const data = getData(nameCity);

  data.then((obj) => {
    ELEMENTS.DETAILS_CITY.textContent = obj.name;
    ELEMENTS.DETAILS_TEMPERATURE.textContent =
      'Temperature: ' + Math.round(obj.main.temp) + '°';
    ELEMENTS.DETAILS_LIKE.textContent =
      'Feels like: ' + Math.round(obj.main.feels_like);
    ELEMENTS.DETAILS_WEATHER.textContent = 'Weather: ' + obj.weather[0].main;
    let sunrise = new Date(obj.sys.sunrise * 1000);
    sunrise = sunrise.toLocaleTimeString();
    ELEMENTS.DETAILS_SUNRISE.textContent = 'Sunrise: ' + sunrise.slice(0, -3);
    let sunset = new Date(obj.sys.sunset * 1000);
    sunset = sunset.toLocaleTimeString();
    ELEMENTS.DETAILS_SUNSET.textContent = 'Sunset: ' + sunset.slice(0, -3);
  });
};

const forecast = (nameCity) => {
  const data = getForecast(nameCity);

  data.then((obj) => {
    ELEMENTS.FORECAST_CITY.textContent = obj.city.name;

    for (let i = 0; i < obj.list.length; i++) {
      const item = obj.list[i];
      const date = item.dt_txt.split(' ')[0].split('-').reverse().join(':');
      const time = item.dt_txt.split(' ')[1];
      const temperature = Math.round(item.main.temp);
      const feelsLike = Math.round(item.main.feels_like);
      const icon = item.weather[0].icon;
      let url = 'https://openweathermap.org/img/w/' + icon + '.png';

      // перезаписываем значения классов в элементах прогноза на странице
      ELEMENTS.FORECAST_TEMPERATURE[i].textContent =
        'Temperature: ' + temperature + '°';
      ELEMENTS.FORECAST_FEELS_LIKE[i].textContent =
        'Feels like: ' + feelsLike + '°';
      ELEMENTS.FORECAST_TIMEZONE[i].textContent = time;
      ELEMENTS.FORECAST_DATE[i].textContent = date;
      ELEMENTS.FORECAST_ICON[i].src = url;
    }
  });
};
