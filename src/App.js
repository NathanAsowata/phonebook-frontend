import { useEffect, useState } from 'react'
import Notification from './Notification'
import phoneServices from "./services/phonebook"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [notificationMesssage, setNotificationMesssage] = (null)
  

  useEffect(() => {
    phoneServices.getAll()
    .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const addNewPerson = (e) => {
    e.preventDefault()
    
    const Found = persons.find(element => element.name === newName)
    const NewPerson = {name: newName, number: newNumber}
    
    if(Found.name === newName) {
      window.confirm(`${newName} already exists in the phonebook`)
      phoneServices.updatePerson(Found.id, NewPerson)
      setNewName("")
      setNewNumber("")
      window.location.reload()
    }else{
      phoneServices.newPerson(NewPerson)
      setPersons(persons.concat(NewPerson))
      setNotificationMesssage(`Added ${newName}`)
      setNewName("")
      setNewNumber("")
    }

  }

  const deletePerson = (id, name) => {
    window.confirm(`Delete ${name}?`)
    phoneServices.deletePerson(id)
    .then(setPersons(persons.filter(person => person.id !== id)))
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMesssage} />
      <form onSubmit={addNewPerson}>
        <div>
          name: 
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          /><br />
          number:
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, id) => {
        return <li key={id}>
                  {`${person.name} ${person.number}`}
                  <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
                </li>
      })}
    </div>
  )
}

export default App