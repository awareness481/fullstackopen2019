import React, { useState } from 'react';

const Results = (props) => {
  const { persons, newSearch } = props;

  const displayPeople = () => {
    if (newSearch === '') {
      return persons.map(person => {
        return <p>{person.name}, {person.phone}</p>
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
      ? copy.map(person => <p>{person.name}, {person.phone}</p>)
      : 'No results';
  }

  return (
    <div>
      <h2>Numbers</h2>
      {displayPeople()}
    </div>
  );
}

export default Results;