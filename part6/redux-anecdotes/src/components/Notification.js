import React, { useEffect } from 'react'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = ({store}) => {
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => async () => {
    await sleep(5000);
    store.dispatch(removeNotification())
  }, [store.getState().notification]);

 

    if (store.getState().notification) {
      return (
      <div style={style}>
        {store.getState().notification}
       </div>
      )
    } else {
      return (
        <div>
        </div>
      )
    } 
}

export default Notification