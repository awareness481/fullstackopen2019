import React from 'react';
import { connect } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer';

const AnecdotesList = (props) => {
  let anecdotes;
  if (props.filter) {
    anecdotes = props.anecdotes.filter((anecdote) => {
      return anecdote.content.includes(props.filter);
    })
  } else {
    anecdotes = props.anecdotes;
  }

  if (anecdotes) {
    anecdotes.sort((a, b) => b.votes - a.votes);
  }

  const vote = (id) => {
    props.voteAction(id);
    props.displayNotification('Voted for id: ' + id)
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

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAction,
  displayNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdotesList);