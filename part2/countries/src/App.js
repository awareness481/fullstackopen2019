import React, { useState, useEffect } from 'react';
import Country from './Country';
import axios from 'axios';


const App = () => {
  const [query, setQuery] = useState('');
  const [countries, fetchCountries] = useState('');
  const [results, findResults] = useState('');


  // const display = (c, show = false) => {
  //   const details = 
  //      (
  //           <div>
  //             <li>Capital: {c.capital}</li>
  //             <li>Population: {c.population}</li>
  //             <li>languages: 
  //               <ul>
  //                 {c.languages.map(c => <li>{c.name}</li>)}
  //               </ul>
  //             </li>
  //             <li>><img src={c.flag} height='500' width='500'/></li>
  //           </div>
  //       );
    
  //   // Make Individual Components, each having a visibility hook TODO
  //   return (
  //     <ul>
  //       <li>{c.name}</li>
  //       <button onClick={show = !show}>Show</button>
  //       {console.log(show)}
  //       {show ? details : ''}
  //     </ul>
  //   );
  // }

  const search = () => {
    const matched = countries.filter(c => {
      return c.name.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    });
    console.log(matched)
    
    if (matched.length === 1) {
      const c = matched[0];
      return <Country c={c} key={c.area} display={true}/>;
    }

    return matched.length > 10
      ? 'Too many results, use a more specific filter'
      : matched.map(c => <Country c={c} key={c.area} />)
  }

  const handleChange = (e) => {
    setQuery(e.target.value);
    findResults(search());
  };

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        fetchCountries(response.data);
      })
  }, [countries]);


  return (
    <div>
      find countries: <input type='text' value={query} onChange={handleChange} />
      {results}
    </div>
  );
}

export default App;
