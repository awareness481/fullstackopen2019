import React from 'react';
import AnecdotesForm from './components/AnecdotesForm'
import AnecdotesList from './components/AnecdotesList';


const App = (props) => {

  return (
    <div>
      <AnecdotesList store={props.store} />
      <AnecdotesForm store={props.store} />
    </div>
  )
}

export default App