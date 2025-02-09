import { useEffect } from 'react'
import weatherService from '../services/weather'
import { useState } from 'react'

const WeatherView = ({ country }) => {

  const [weather, setWeather] = useState(null)

  const queryWeather = (city) => {
    weatherService.getWeather(city)
      .then(response => response.data)
      .then(data => {
        setWeather(data)
      })
      .catch(err => {
        setWeather(null)
      })
  }

  useEffect(() => {
    queryWeather(country.capital[0])
  }, [country])

  if (!country)
    return null

  if (weather) {
    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return (
      <div>
        <h3>Weather in {country.capital[0]}</h3>
        <div>temperature {(weather.main.temp - 273.15).toFixed(0)} Celsius</div>
        <div>
          <img src={iconUrl} />
        </div>
        <div>wind {weather.wind.speed} m/s</div>
      </div>
    )
  }
  return (
    <div>
      <h3>Weather in {country.capital[0]}</h3>
    </div>
  )
}

export default WeatherView