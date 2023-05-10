
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter,setNewFilter]=useState({query:'', list:[]})
  const [showAll, setShowAll]=useState(true)


  const addPerson = (event) => {
    event.preventDefault()
    const NameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(NameObject))
      setNewName('')
      setNewNumber('')
    }
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange=(event)=>{
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={newFilter}
      onChange={handleFilterChange}
      type="search"/></div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div> name: <input value={newName}
          onChange={handleNameChange} /> </div>
        <div>number:<input value={newNumber}
          onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <li>
        {persons.map((person) => <div key={person.name}>{person.name} {person.number}</div>)}
      </li>
    </div>
  )
}


export default App