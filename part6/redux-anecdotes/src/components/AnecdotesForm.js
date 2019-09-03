import React from 'react';
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer';
import { displayNotification } from '../reducers/notificationReducer';

const AnecdotesForm = (props) => {
  const create = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    props.createAnecdote(content);
    props.displayNotification(content)
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