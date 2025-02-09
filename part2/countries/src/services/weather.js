import axios from 'axios'

const apiKey = import.meta.env.VITE_OPENWEATHERMAP_KEY
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=`

const getWeather = (cityName) => {
    return axios.get(baseUrl + cityName)
}

export default { getWeather }