import React from 'react';

const Button = (props) => {
  return (
    <button onClick={() => props.handleClick(props.state + 1)}>{props.text}</button>
  )
  
}

export default Button;