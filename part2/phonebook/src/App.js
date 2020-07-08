import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Names from './components/Names'
import Personform from './components/Personform'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} already in phonebook, update current entry?`)) {
        const id = persons.findIndex( person => person.name === newName) + 1;
        personService
          .updatePerson(id, personObject)
          .then ( () => {
            personService
              .getAll()
              .then(response => 
                setPersons(response.data))
          })
        setNewName('')
        setNewNumber('')
      }
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  
  const deletePerson = (event) => {
    const name = event.target.attributes.name.value;
    console.log(name)
    const id = event.target.attributes.id.value.toString();
    if (window.confirm(`Delete ${name}?`)) {
      personService
      .deletePerson(id)
      .then( () => {
        personService
          .getAll()
          .then(response => 
            setPersons(response.data))
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
        <Filter filter={newFilter} filterChange={handleFilterChange} />
      <h2>Add new name and number</h2>
        <Personform 
          addPerson={addPerson} 
          newName={newName} 
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
        <Names persons={persons} newFilter={newFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App
