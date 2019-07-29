import React, { useState } from 'react';

const Display = ({c, display = false}) => {
  const [visible, setVisible] = useState(display);
  console.log(visible);

  if (!visible) {
    return (
      <div>
        <button onClick={() => setVisible(true)}>Show</button>
      </div>
      
    );
  }

  return (
    <ul>
      <div className={c.name}>
        <li>Capital: {c.capital}</li>
        <li>Population: {c.population}</li>
        <li>languages: 
          <ul>
            {c.languages.map(c => <li key={c.name}>{c.name}</li>)}
          </ul>
        </li>
        <li><img src={c.flag} height='500' width='500'/></li>
      </div>
    </ul>
  );
}

export default Display;