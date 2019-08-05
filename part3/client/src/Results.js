import React, { useState } from 'react';
import apiService from './services/api'
import Notification from './Notification';

const { remove } = apiService;


const Results = ({ persons = [], newSearch }) => {
  const [ error, setError ] = useState(null);
  
  console.log('prop persons');
  console.log(persons);

  const handleDelete = (name) => {
    if (window.confirm('Remove person?')) {
      remove(name)
        .catch(e => setError(`'Information for ${name} has already been removed`));
    }
  };

  const displayPeople = () => {
    console.log(persons)

    if (newSearch === '') {
      return persons.map((person, i) => {
        return (
          <div key={person.name}>
            <p>{person.name}, {person.number}</p>
            <button onClick={() => handleDelete(person.name)}>Delete</button>
          </div>
        )
        
       })
    }
    return fetchSearchResults();
  }

  const fetchSearchResults = () => {
    const copy = persons.filter((person) => {
      return person.name.toLocaleLowerCase().includes(newSearch.toLocaleLowerCase());
    });

    console.log(copy)
    console.log(copy.length)
    return (copy.length > 0)
      ? copy.map(person => <p>{person.name}, {person.number}</p>)
      : 'No results';
  }

  return (
    <div>
      <Notification message={error} error={true} />
      <h2>Numbers</h2>
      {displayPeople()}
    </div>
  );
}

export default Results;