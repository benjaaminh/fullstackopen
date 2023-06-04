
import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  //const [showAll, setShowAll]=useState(true)
  const [filteredList,setFilteredList]= useState(persons)



  const handleFilterChange=(event)=>{
      const query=event.target.value
  
      var updatedList= [...persons]
  
      updatedList = updatedList.filter(person => 
       person.name.toLowerCase().indexOf(query.toLowerCase())!== -1) //checks index of characters from input appearing in names, if larger than -1, they appear in the name
  
      setFilteredList(updatedList)
    }


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

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      addPerson={addPerson}
      newName={newName}
      newNumber={newNumber}/>

      <h2>Numbers</h2>
      <Persons persons={persons}/>

    </div>
  )
}


export default App