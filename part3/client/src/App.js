import React, { useState, useEffect } from 'react'
import apiService from './services/api';

import PersonForm from './PersonForm';
import SearchFilter from './SearchFilter';
import Notification from './Notification';


const { getAll, create, update } = apiService;

const App = () => {

  const [ persons, setPersons] = useState([]);
  const [ message, setMessage ] = useState(null);
  
  useEffect(() => {
    function fetch() {
 getAll().then(res => res.data).then(res => setPersons(res))

    }
fetch()
  }, []);
    


  const checkDuplicate = (newName) => {
    return getAll()
      .then(res => res.data)
      .then(res => (res.filter(person => person.name === newName)))
      .then(res => (res.length > 0))
  }
  

  const handleNameSubmit = async (e, newName, newPhone) => {
    e.preventDefault();
console.log(persons)

    if (await checkDuplicate(newName)) {
      if (window.confirm('Name already exists. Replace number?')) {
	
        const copy = [...persons]
        .map(e => e.name === newName ? {name: newName, number: newPhone, id: e.id} : e);
	      const index = copy.map(e => e.name).indexOf(newName)
        update(newName, copy[index]);
        setMessage(`Updated number for ${newName}`);
        return setPersons(copy)
      }
      
    }
    setMessage(`Added ${newName} to the database!`);
    const copy = [...persons];
    copy.push({name: newName, number: newPhone});
    create({name: newName, number: newPhone});
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