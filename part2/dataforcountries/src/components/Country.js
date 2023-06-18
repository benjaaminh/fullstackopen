
const Country = ({country}) => {
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
    </div>
    )
}
export default Country