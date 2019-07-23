import React, { useState } from 'react'
import Statistics from './Statistics';
import Button from './Button';


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give feedback</h2>
      <div className='buttons'>
        <Button state={good} text='good' handleClick={setGood}></Button>
        <Button state={neutral} text='neutral' handleClick={setNeutral}></Button>
        <Button state={bad} text='bad' handleClick={setBad}></Button>
      </div>
      <Statistics stats={{
        good,
        neutral,
        bad
      }}
      />
    </div>
  )
}

export default App;
