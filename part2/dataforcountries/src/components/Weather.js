import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {



    const [weather, setWeather] = useState([])
    const api_key = process.env.REACT_APP_API_KEY


    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
            .then(response => {
                setWeather(response.data)

            })
    }, [])

    if (weather.length < 1) {
        return (
            null
        )


    }

    else {
        const imgSrc = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        return (
            <div>
                <h2>Weather in {country.capital}</h2>
                <div>temperature {weather.main.temp} Celsius</div>
                <img src={imgSrc} />
                <div>wind {weather.wind.speed} m/s</div>
            </div>
        )
    }
}
export default Weather