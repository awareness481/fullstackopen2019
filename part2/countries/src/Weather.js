import React, { useState, useEffect} from 'react';
import { WEATHER_API_KEY } from './config/api';
import axios from 'axios';

const Weather = ({city}) => {
  const [weather, setWeather] = useState('');

  useEffect(() => {
    axios.get(`http://api.apixu.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}`)
      .then(res => res.data)
      .then(res => setWeather(res));
  })

  if (!weather) return '';

  return (
    <div>
      <h2>Weather in {city}</h2>
      <b>temperature: {weather.current.temp_c}</b>
      <p>Condition: {weather.current.condition.text}</p>
      <img src={'http:' + weather.current.condition.icon} />
      <p>wind: {weather.current.wind_kph}</p>
    </div>
  );
}

export default Weather;