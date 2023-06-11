
import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

//TODO: fix filtering/persons. filteredlist is rendered but filtering doesnt work if persons is rendered. 


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  //const [showAll, setShowAll]=useState(true)
  const [filteredList,setFilteredList]= useState(persons)


  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
        setFilteredList(initialPersons)
      })
  }
  
  useEffect(hook,[])

  const handleFilterChange=(event)=>{
      const query=event.target.value
  
      var updatedList= [...persons]
  
      updatedList = updatedList.filter(person => 
       person.name.toLowerCase().indexOf(query.toLowerCase())!== -1) //checks index of characters from input appearing in names, if larger than -1, they appear in the name
  
      setFilteredList(updatedList)
   //   setPersons(updatedList)
    }


  const addPerson = (event) => {
    event.preventDefault()
    const NameObject = {
      name: newName,
      number: newNumber
    }
    if (filteredList.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      personService
      .create(NameObject)
      .then(response => {
      setFilteredList(filteredList.concat(response.data))
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })}
  }

  const deletePerson = (id) => {
    //event.preventDefault()
    const person = persons.find(n => n.id === id)
if (window.confirm("do you want to delet")){
  personService
  .deleteItem(id)
  .then(setPersons(persons.filter(n => n.id !== id)))
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
      <Persons filteredList={filteredList}
      toggleDelete={deletePerson}/>

    </div>
  )
}


export default App