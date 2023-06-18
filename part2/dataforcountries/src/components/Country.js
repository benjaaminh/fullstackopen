import {useState, useEffect} from 'react'
import axios from 'axios'


const Country = ({country}) => {
    const [weather, setWeather] = useState([])
    const api_key = process.env.REACT_APP_API_KEY
    useEffect(()=>{
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${api_key}`)
        .then(response=>{
            setWeather(response.data)
            console.log(response.data)
        })
    },[])

    return (
    <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <b>languages:</b>
       <ul>
        {Object.values(country.languages).map(language => <li key={language}> {language} </li>)}
        </ul>
       <div>
        <img src={country.flags.png} alt="flag" ></img>
    </div>
    <h1>Weather in {country.capital}</h1>
    <ul>{weather.map((weather,num)=>
    <li key ={num}> {weather.current.temp}</li>
    )}</ul>
    </div>
    )
}
export default Country