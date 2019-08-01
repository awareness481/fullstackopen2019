import React, { useState } from 'react'
import apiService from './services/api';

import PersonForm from './PersonForm';
import SearchFilter from './SearchFilter';
import Notification from './Notification';


const { getAll, create, update } = apiService;

const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [ message, setMessage ] = useState(null);

  const checkDuplicate = (newName) => {
    return getAll()
      .then(res => res.data)
      .then(res => (res.filter(person => person.name === newName)))
      .then(res => (res.length > 0))
  }
  

  const handleNameSubmit = async (e, newName, newPhone) => {
    e.preventDefault();

    if (await checkDuplicate(newName)) {
      if (window.confirm('Name already exists. Replace number?')) {
        const copy = [...persons];
        copy[newName] = {
          name: newName,
          phone: newPhone,
        }
        update(newName, { name: newName, phone: newPhone});
        setMessage(`Updated number for ${newName}`);
        setPersons(copy)
      }
      return;
    }
    setMessage(`Added ${newName} to the database!`);
    const copy = [...persons];
    copy.push({name: newName, phone: newPhone});
    create({name: newName, phone: newPhone});
    setPersons(copy);
  }

  return (
    <div>
      <Notification message={message} />
      <h2>Phonebook</h2>
      <PersonForm persons={persons} submit={handleNameSubmit}/>
      <SearchFilter persons={persons} />
    </div>
  )
}

export default App;