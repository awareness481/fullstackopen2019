import React from 'react';
import Display from './Display';

const Country = ({c, display = false}) => {
  const func = () => {
    console.log('--------')
    console.log(c);
  }
  func();
  return (
    <div>
      <ul>
        <li>{c.name}</li>
        <Display c={c} key={c.name} display={display}/>
      </ul>
    </div>
  )
};

export default Country;