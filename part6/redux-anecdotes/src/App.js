import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AnecdotesForm from './components/AnecdotesForm'
import AnecdotesList from './components/AnecdotesList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { initializeAnecdotes } from './reducers/anecdoteReducer';


const App = (props) => {

  useEffect(() => props.initializeAnecdotes(), [])

  return (
    <div>
      <Filter />
      <AnecdotesList />
      <AnecdotesForm />
      <Notification />
    </div>
  )
}

export default connect(
  null, { initializeAnecdotes }
)(App)