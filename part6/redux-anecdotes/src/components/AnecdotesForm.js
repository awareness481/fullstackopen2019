import React from 'react';
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer';
import { displayNotification } from '../reducers/notificationReducer';

const AnecdotesForm = (props) => {
  const create = (e) => {
    e.preventDefault();
    props.createAnecdote(e.target.anecdote.value)
    props.displayNotification(e.target.anecdote.value)
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

const mapDispatchToProps = {
  createAnecdote,
  displayNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdotesForm);