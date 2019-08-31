import React from 'react';
import AnecdotesForm from './components/AnecdotesForm'
import AnecdotesList from './components/AnecdotesList';
import Notification from './components/Notification';


const App = ({store}) => {

  return (
    <div>
      <AnecdotesList store={store} />
      <AnecdotesForm store={store} />
      <Notification store={store} />
    </div>
  )
}

export default App