import React, { useState, useEffect } from 'react'
import personService from './services/Persons'
import "./App.css"

const Person = ({person, deleteButton }) => {
  return (
    <li> {person.name} {person.number}
        <button onClick={deleteButton}>Delete</button>
  </li>
  )
}

const Persons = ({ persons, deleteButton }) => {

  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <Person key={person.id} person={person} deleteButton={() => deleteButton(person.id)}/>)}
      </ul>
    </div>
  )
}

const Message = ({ message, error }) => {
  if (error) {
    const style = {
      color: 'red'
    }
    return (
      <div style={style} className="message">{message}</div>
    )
  } else {
    return (
      <div className="message">{message}</div>
    )
  }
}

const Adder = ({persons, newName, newNumber, setPersons, setNewName, setNewNumber, setMessage, setError }) => {
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const existingPerson = persons.find(n => n.name === newName)
        const newPerson = {...existingPerson, number: newNumber}
        personService.updateNumber(newPerson.id, newPerson).then(returnedPerson => {
          setError(false)
          setPersons(persons.map(person => person.id !== newPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`${newName} succesfully edited`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }).catch(error => {
          setError(true)
          setNewName('')
          setNewNumber('')
          setPersons(persons.filter(n => n.name !== newName))
          setMessage(`Information on ${newName} has already been removed from the server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
    } else {
      const person = {
        name: newName,
        number: newNumber
      }
      personService
        .create(person)
        .then(newPerson => {
          setError(false)
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`${newName} succesfully added`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Add a new number</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>number:
          <input
            value={newNumber}
            onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Search = ({ value, setNewSearch }) => {
  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  return (
    <form>
      <div>
        filter shown with:
        <input value={value} onChange={handleSearchChange}/>
      </div>
    </form>
  )
}

const App = () => {

  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setNewSearch ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ error, setError ] = useState(false) 

  const numbersToShow = search.length > 0 ? persons.filter(person => person.name.toLowerCase().startsWith(search.toLowerCase())) : persons

  useEffect(() => {
    personService
      .getAll()
      .then(personsAtStart => {
        setPersons(personsAtStart)
      })
  }, [])

  const deleteButton = (id) => {
    const toBeDeleted = persons.find(n => n.id === id)
    if (window.confirm(`Do you really want to delete ${toBeDeleted.name}?`)) {
      personService.deletePerson(id).then(success => {
        setError(false)
        setNewSearch('')
        setPersons(persons.filter(n => n.id !== id))
        setMessage(`${toBeDeleted.name} succesfully deleted`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }).catch(error => {
        setError(true)
        setPersons(persons.filter(n => n.id !== id))
        setNewName('')
        setNewNumber('')
        setMessage(`Information on ${toBeDeleted.name} has already been removed from the server`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  if (message !== null) {
    return (
      <div>
        <h2>Phonebook</h2>
        <Message message={message} error={error}/>
        <Search value={search} setNewSearch={setNewSearch}/>
        <Adder persons={persons} newName={newName} newNumber={newNumber} setPersons={setPersons} setNewName={setNewName} 
          setNewNumber={setNewNumber} setMessage={setMessage} setError={setError}/>
        <div>
          <Persons persons={numbersToShow} deleteButton={deleteButton}/>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Phonebook</h2>
        <Search value={search} setNewSearch={setNewSearch}/>
        <Adder persons={persons} newName={newName} newNumber={newNumber} setPersons={setPersons} setNewName={setNewName}
          setNewNumber={setNewNumber} setMessage={setMessage} setError={setError}/>
        <div>
          <Persons persons={numbersToShow} deleteButton={deleteButton}/>
        </div>
      </div>
    )
  }

}

export default App