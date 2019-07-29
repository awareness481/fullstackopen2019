import React, { useState } from 'react';
import Results from './Results';

const SearchFilter = (props) => {
  const persons = props.persons;

  const [ newSearch, setNewSearch ] = useState('');

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  }

  return (
    <div>
      filter: <input value={newSearch} onChange={handleSearchChange}/>
      <Results persons={persons} newSearch={newSearch} />
    </div>
  );
}

export default SearchFilter;