import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const voteAction = (id) => {
  return async dispatch => {
    const update = await anecdoteService.vote(id);
    dispatch({
      type: 'VOTE',
      id
    })
  }
}

export const createAnecdote = (text) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(text);
    dispatch({
      type: 'CREATE_ANECDOTE',
      text
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes
    })
  }
}


const reducer = (state = [], action) => {

  switch(action.type) {
    case 'VOTE':
      const shallow = [...state];
      const index = shallow.map(e => e.id).indexOf(action.id)
      console.log(index)
      shallow[index].votes++;
      return shallow;
    case 'INIT_ANECDOTES':
      return action.anecdotes
    case 'CREATE_ANECDOTE':
      return [
        ...state,
        {
          content: action.text,
          id: getId(),
          votes: 0
        }
      ]
    default:
      return state;
  }
}

export default reducer