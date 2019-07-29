import React from 'react';
import Header from './Header';
import Part from './Part';
import Total from './Total';

const Course = (props) => {
  const course = props.course;

  return (
    <div>
      <Header course={course.name} />
      {course.parts.map((part) => {
        console.log(part);
        return <Part key={part.name} course={part} />;
      })}
      <Total course={course.parts} />
    </div>
  );
};

export default Course;