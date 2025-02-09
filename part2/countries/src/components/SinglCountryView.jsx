import Weather from "../services/weather"
import WeatherView from "./WeatherView"

const SingleCountryView = ({ country }) => {
    if (!country)
        return null
    return (
        <div>
            <h3>{country.name.common}</h3>
            capital
            <ul>
                {country.capital.map((capital, i) => (
                    <li key={i}>
                        {capital}
                    </li>
                ))}
            </ul>

            area {country.area}
            <div>
                <h4>Languages</h4>
                <ul>
                    {Object.values(country.languages).map((lang, i) => (
                        <li key={i}>
                            {lang}
                        </li>
                    ))}
                </ul>
            </div>
            <img src={country.flags.png} />
            <WeatherView country={country} />
        </div>
    )
}

export default SingleCountryView