const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
const serverForecast = 'https://api.openweathermap.org/data/2.5/forecast';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';

const getData = async (cityName) => {
  try {
    //Запрос на сервер
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
    //ответ от сервера
    const data = await fetch(url);

    return data.json(); // преобразуем JSON в объект JavaScript
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch weather data');
  }
};

const getForecast = async (cityName) => {
  try {
    //Запрос на сервер
    const url = `${serverForecast}?q=${cityName}&cnt=5&appid=${apiKey}&units=metric`;

    //ответ от сервера
    const data = await fetch(url);

    return data.json(); // преобразуем JSON в объект JavaScript
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch forecast data');
  }
};

export { getData, getForecast };
