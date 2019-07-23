import React from 'react';
import Statistic from './Statistic';

const Statistics = (props) => {

  const {good, neutral, bad} = props.stats;

  if (good + neutral + bad === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        No Feedback given
      </div>
    )
  }

  return (
      <table className='stats'>
        <caption>Statistics</caption>
        <tbody>
          <Statistic text={'good: '} value={good} />
          <Statistic text={'neutral: '} value={neutral} />
          <Statistic text={'bad: '} value={bad} />
          <Statistic text={'all: '} value={good + neutral + bad} />
          <Statistic text={'average: '} value={(good - bad) / (good + neutral + bad)} />
          <Statistic text={'positive: '} value={(good / (good + neutral + bad) * 100)} />
        </tbody>
      </table>
  )
}

export default Statistics;