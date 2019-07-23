import React, { useState } from 'react'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])

  const handleClick = () => {
    const random = Math.floor(Math.random() * props.anecdotes.length);
    console.log(random)
    setSelected(random);
  }

  const handleVote = () => {
    const copy = [...points];
    copy[selected]++;
    setPoints(copy);
  }

  const mostVotes = () => {
    const max = points.indexOf(Math.max(...points));
    return props.anecdotes[max];
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <br />
      Votes: {points[selected]}
      <br />
      <button onClick={handleClick}>Next Anecdote</button>
      <button onClick={handleVote}>Vote</button>
      <h2>Anecdote with most votes</h2>
      {mostVotes()}
    </div>
  )
}


export default App;
