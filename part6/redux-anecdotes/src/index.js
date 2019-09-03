import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer'


const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(
  reducer, 
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)



const render = () => {
  ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)