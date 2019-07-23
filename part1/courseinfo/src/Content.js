import React from 'react';
import Part from './Part';

const Content = (props) => {
  return (
    <div>
      <Part name={props.course[0].name} exercises={props.course[0].exercises}/>
      <Part name={props.course[1].name} exercises={props.course[1].exercises}/>
      <Part name={props.course[2].name} exercises={props.course[2].exercises}/>
    </div>
  )
}

export default Content;