
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [allPersons, setAllPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredList, setFilteredList] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setAllPersons(initialPersons)
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    const query = event.target.value
    setFilteredList(query)
    var updatedList = [...allPersons]


    updatedList = updatedList.filter(person =>
      person.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) 

    setPersons(updatedList)
  }


  const addPerson = (event) => {
    event.preventDefault()
    const NameObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.filter(person => person.name === newName).length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(n => n.name === newName)
        personService.update(person.id, NameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
          })
          .catch(error => {
            setNotificationMessage(`Information of ${person.name} has already been removed from server`)
            setTimeout(() => {
              setNotificationMessage(null)

            }, 5000)

          })
        setNotificationMessage(`${person.name}'s number was changed`)
        setTimeout(() => {
          setNotificationMessage(null)

        }, 5000)


      }

    } else {
      personService
        .create(NameObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`the person '${newName}' was added`)
          setTimeout(() => {
            setNotificationMessage(null)

          }, 5000)
        })
    }


  }

  const deletePerson = (id) => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`do you want to delete '${person.name}'?`)) {
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
      <Notification message={notificationMessage} />
      <Filter handleFilterChange={handleFilterChange} filter={filteredList}/>
      <h2>add a new</h2>
      <PersonForm handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber} />

      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <Person key={person.id} person={person} toggleDelete={() => deletePerson(person.id)} />
        )}
      </div>
    </div>
  )
}


export default App