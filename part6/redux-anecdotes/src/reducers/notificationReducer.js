export const displayNotification = (message) => {
  return {
    type: 'DISPLAY_NOTIFICATION',
    message
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

const notificationReducer = (state = 'Hello', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'DISPLAY_NOTIFICATION':
      return action.message;
    case 'REMOVE_NOTIFICATION':
      return '';
    default:
      return state;
  }
}

export default notificationReducer;