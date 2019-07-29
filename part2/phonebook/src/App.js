import React, { useState } from 'react'

import PersonForm from './PersonForm';
import SearchFilter from './SearchFilter';

const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]); 

  const checkDuplicate = (newName) => {
    return persons.filter(person => person.name === newName).length > 0;
  }

  const handleNameSubmit = (e, newName, newPhone) => {
    e.preventDefault();

    if (checkDuplicate(newName)) {
      alert(`${newName} already exists`);
      return 'duplicate error'
    }

    const copy = [...persons];
    copy.push({name: newName, phone: newPhone});
    setPersons(copy);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm persons={persons} submit={handleNameSubmit}/>
      <SearchFilter persons={persons} />
    </div>
  )
}

export default App;