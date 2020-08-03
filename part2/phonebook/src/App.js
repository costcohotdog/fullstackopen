import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Names from './components/Names'
import Personform from './components/Personform'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState('')
  const [ messageType, setMessageType ] = useState('')

  // get all people in phonebook
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

  // function for resetting the notification message and form boxes
  const messageReset = () => {
    setTimeout(() => {
      setNotificationMessage(null)
      setMessageType('none')
    }, 3000)
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (event) => {
    // prevent page reload
    event.preventDefault();

    // prevent submitting blank form
    if (newName.length < 1 || newNumber < 1) {
      return;
    }
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    //check whether person is already in phonebook
    if (persons.some(person => person.name === newName)) {

      // if name already in phonebook, user may update entry
      if (window.confirm(`${newName} already in phonebook, update current entry?`)) {

        //get person id
        const matchingPerson = persons.find(person => person.name === newName)
        const id = matchingPerson.id
        personService
          .updatePerson(id, personObject)
          .then ( () => {
            personService
              .getAll()
              .then(response => {
                setPersons(response.data)
                setMessageType('good')
                setNotificationMessage(`${newName} updated successfully!`)
                messageReset()
              })
          })
          .catch(error => {
            personService
              .getAll()
              .then(response => {
                setPersons(response.data)
                setMessageType('bad')
                setNotificationMessage(`${newName} was already deleted from the database`)
                messageReset()
              })
          })
      } 
    } else { // if name not in phonebook, create new entry, then fetch all persons 
      personService
        .create(personObject)
        .then(response => {
          personService
            .getAll()
            .then(response => {
              setPersons(response.data)
            })
          setMessageType('good')
          setNotificationMessage(`${newName} added successfully!`)
          messageReset()
        })
        .catch(error => {
          setMessageType('bad')
          if (error.response.data.error.includes('name')) {
            setNotificationMessage('Name requires a minimum length of 3')
          } else {
            setNotificationMessage('Number requires a minimum length of 8')
          }
          messageReset()
        })
    }
  }
  
  const deletePerson = (event) => {
    const name = event.target.attributes.name.value;
    const id = event.target.attributes.id.value.toString();
    if (window.confirm(`Delete ${name}?`)) {
      personService
      .deletePerson(id)
      .then( () => {
        personService
          .getAll()
          .then(response => 
            setPersons(response.data))
            setMessageType('bad')
            setNotificationMessage(`${name} removed successfully!`)
            messageReset()
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
      <Notification message={notificationMessage} type={messageType} />
      <h2>Numbers</h2>
        <Names persons={persons} newFilter={newFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App
