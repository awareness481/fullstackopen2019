import React from 'react';

const Total = (props) => {
  const total = props.course.reduce((p, c) => {
    return p + c.exercises;
  }, 0)

  return (
    <p>Total: {total} </p>
  )
}

export default Total;