import React from 'react';

const Statistic = (props) => {
  return (
    <tr><td>{props.text}{props.value}</td></tr>
  )
}

export default Statistic;