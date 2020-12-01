import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Weather = ({ country }) => {
  const apiKey = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.name}`)
    .then(response => {setWeather(response.data)})}, [])

  if (Object.keys(weather).length === 0) return  'Loading...'
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p><b>temperature: </b>{weather.current.temperature} Celcius</p>
      <img src={weather.current.weather_icons} width="100px" alt="weather icon"/>
      <p><b>wind: </b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
    </div>
  )
}

export default Weather;