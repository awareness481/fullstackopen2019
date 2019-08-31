import React from 'react';
import { voteAction } from '../reducers/anecdoteReducer'

const AnecdotesList = ({store}) => {
  const anecdotes = store.getState().sort((a, b) => b.votes - a.votes)

  const vote = (id) => {
    store.dispatch(voteAction(id));
  }

  return (
    <div>
      <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdotesList;