import React from 'react';
import AnecdotesForm from './components/AnecdotesForm'
import AnecdotesList from './components/AnecdotesList';
import Notification from './components/Notification';
import Filter from './components/Filter';


const App = ({store}) => {

  return (
    <div>
      <Filter />
      <AnecdotesList />
      <AnecdotesForm />
      <Notification />
    </div>
  )
}

export default App