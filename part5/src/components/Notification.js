import React from 'react';
import '../css/message.css';

const Notification = ({ message, error = false }) => {
  console.log(message)
  if (message === null) {
    return null
  }

  if (error === true) {
    return (
      <div className="error hide">
        {message}
      </div>
    )
  }

  return (
    <div className="success hide">
      {message}
    </div>
  )
}

export default Notification;