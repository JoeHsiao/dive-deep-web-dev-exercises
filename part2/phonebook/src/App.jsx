import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from './services/persons'

const Notification = ({ message, color }) => {
  if (!message)
    return
  const notificationStyle = {
    color: color,
    backgroundColor: 'lightgray',
    padding: '15px',
    border: `3px solid, ${color}`,
    borderRadius: "5px"
  }
  return (
    <div>
      <h3 style={notificationStyle}>
        {message}
      </h3>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('green')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const clearAdditionFields = () => {
    setNewName('')
    setNewNumber('')
  }

  const updatePersonWithNewNumber = (person, number) => {
    const personWithNewNumber = { ...person, number: number }
    personService
      .updateNumber(personWithNewNumber)
      .then(reponse => {
        setPersons(persons.map(p => p.id === personWithNewNumber.id ? personWithNewNumber : p))
        clearAdditionFields()
        setNotificationColor('green')
        setNotificationMessage(`Updated ${newName}'s number to ${newNumber}`)
        setTimeout(() => {
          setNotificationMessage('')
        }, 5000)
      })
      .catch(error => {
        setNotificationColor('red')
        setNotificationMessage(`Information of ${newName} has already been removed from server`)
        setPersons(persons.filter(p => p.id != person.id))
        clearAdditionFields()
      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personExists = persons.find(p => p.name === newName)
    if (personExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        updatePersonWithNewNumber(personExists, newNumber)
      }
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        clearAdditionFields()
        setNotificationMessage(`Added ${newName}`)
        setTimeout(() => {
          setNotificationMessage('')
        }, 5000)
      })
  }

  const handleRemove = (id) => {
    const personToDelete = persons.find(p => p.id === id)
    if (!window.confirm(`Delete ${personToDelete.name}`)) {
      return
    }
    personService
      .remove(id)
      .then(response => {
        const afterRemove = persons.filter(p => p.id != id)
        setPersons(afterRemove)
      })
  }
  const filterByName = (name) => {
    if (name === "") return []
    return persons.filter(p => p.name.includes(name))
  }

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} color={notificationColor} />
      <Filter keyword={filterName} handleFilterChange={handleFilterChange} />
      <div>
        Filtered result:
        {filterByName(filterName).map((p, i) =>
          <div key={i}>
            {p.name} {p.number}
          </div>
        )}
      </div>

      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newNameValue={newName} handleNameChange={handleNameChange} newNumberValue={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons={persons} handleRemove={handleRemove} />

    </div>
  )
}

export default App