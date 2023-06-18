import Country from './Country'


const Countries = ({countries, setCountries}) => {
    if (countries.length > 10) {
        return (
          <div>
            Too many matches, specify another filter
          </div>
        )
   
    } else if (countries.length===1) {
        return (
          <Country country={countries[0]}/>
        )
    }
   else  {
    return (
      <ul>
        {countries.map((country, num) =>
          <li key={num}> {country.name.common} 
          <button onClick={()=>setCountries([country])}>show</button>
          </li>
        )}
      </ul>
    )
  }
}


export default Countries