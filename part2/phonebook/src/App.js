import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import personService from './services/personService';
import Notification from './components/Notification';
import './index.css'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ getClass, setGetClass ] = useState('')

  useEffect(() => {
    console.log('effect')
    personService.getAll()
        .then(response => {
          setPersons(response.data)
        })
  }, [])

  const addName = event => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const nameExist = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
    if (nameExist) {
      const changeNumber = {...nameExist, number: newNumber}
      const {id} = nameExist
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(id, changeNumber)
        .then(response => 
          setPersons(persons.map(person => 
            person.id !== id ? person : response.data)),
            setErrorMessage(`${nameExist.name}'s number updated`),
            setGetClass('completed'),
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000))
            .catch(error => {
              setGetClass('error')
              setErrorMessage(`Information for ${nameExist.name} has already been removed from server`)
              setPersons(persons.filter(person => 
                person.id !== id))
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000);
            })
            
      }
      setNewName('')
      setNewNumber('')
    } else {
      personService.create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setGetClass('completed')
        setErrorMessage(`Added ${newName}`)
        setNewName('')
        setNewNumber('')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  const nameFilter =  persons.filter(person =>
                      person.name
                      .toLowerCase()
                      .indexOf(newFilter) !== -1);

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleDelete = id => {
    const personToDel = persons.find(p => p.id === id)
    const confirmDel = window.confirm(`Delete ${personToDel.name}?`)
    if (confirmDel) {
      personService.deletePerson(id).then(() => {
        const notDelPerson = persons.filter(value => value.id !== id)
        setPersons(notDelPerson)
        setGetClass('completed')
        setErrorMessage(`${personToDel.name} was deleted`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })
      .catch(error => {
        setGetClass('error')
        setErrorMessage(`Information for ${personToDel.name} has already been removed from server`)
        const notDelPerson = persons.filter(value => value.id !== id)
        setPersons(notDelPerson)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
        <Notification message={errorMessage} changeClass={getClass}/>
        <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
        <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}
          newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
        <Persons filterPerson={nameFilter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
