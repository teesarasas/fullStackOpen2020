import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ header }) => <h1>{header}</h1>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td> <td>{value}</td>
    </tr>
  )
};

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad
  const avg = (good - bad) / sum
  const positive = (good / sum) * 100

  if (good === 0 && neutral === 0 && bad === 0) {
    return <div>No feedback given</div>
  } else {
    return (
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={sum} />
          <Statistic text="average" value={avg} />
          <Statistic text="positive" value={positive + " %"} />
        </tbody>
      </table>
    )
  }
};



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = () => setGood(good + 1)
  const setToNeutral = () => setNeutral(neutral + 1)
  const setToBad = () => setBad(bad + 1)

  return (
    <div>
      <Header header="give feedback" />
      <Button handleClick={setToGood} text="good" />
      <Button handleClick={setToNeutral} text="neutral"/>
      <Button handleClick={setToBad} text="bad"/>
      
      <Header header="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
};

ReactDOM.render(<App />, 
  document.getElementById('root')
)