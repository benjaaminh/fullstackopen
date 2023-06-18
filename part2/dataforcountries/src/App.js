import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Countries from './components/Countries'



const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [countries, setCountries] = useState([])
  const [filteredList, setFilteredList] = useState('')


  useEffect(() => {

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data)


      })
  }, [])


  const handleFilterChange = (event) => {
    const query = event.target.value
    setFilteredList(query)
    var updatedList = [...allCountries]


    updatedList = updatedList.filter(country =>
      country.name.common.toLowerCase().indexOf(query.toLowerCase()) !== -1) //checks index of characters from input appearing in names, if larger than -1, they appear in the name

    setCountries(updatedList)
    //   setPersons(updatedList)
  }






  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} filter={filteredList}></Filter>
      <Countries countries={countries} setCountries={setCountries}></Countries>
    </div>
  )


}
export default App