import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { displayNotification } from '../reducers/notificationReducer';

const AnecdotesForm = ({store}) => {
  const create = (e) => {
    e.preventDefault();
    store.dispatch(createAnecdote(e.target.anecdote.value))
    store.dispatch(displayNotification(e.target.anecdote.value))
    e.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdotesForm;