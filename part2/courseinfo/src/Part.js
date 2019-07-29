import React from 'react';

const Part = (props) => {
  return (
    <p>Course name: {props.course.name}, exercises: {props.course.exercises}</p>
  )
}

export default Part;