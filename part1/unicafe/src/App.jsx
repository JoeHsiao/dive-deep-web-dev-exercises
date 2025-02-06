import { useState } from 'react'

const Header = ({text}) => {
  return (
    <h3>{text}</h3>
  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Buttons = ({goodText, handleGood, neutralText, handleNeutral, badText, handleBad}) => {
  return (
    <div>
      <Button text={goodText} onClick={handleGood}/>
      <Button text={neutralText} onClick={handleNeutral}/>
      <Button text={badText} onClick={handleBad}/>
    </div>
  )
}

const Statistics = ({title, good, neutral, bad}) => {
  return (
    <div>
      <StatisticHeader text={title}/>
      <StatisticBody good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const StatisticHeader = ({text}) => (
  <h3>{text}</h3>
)

const StatisticBody = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all
  if (all == 0) {
    return (
      <>No feedback given</>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neurtal" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={all}/>
        <StatisticLine text="average" value={average}/>
        <StatisticLine text="positive" value={(positive*100).toString() + " %"}/>
      </tbody>
    </table>
  )
}

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <Header text="give feedback"/>
      <Buttons goodText="good" handleGood={handleGood} neutralText="neutral" handleNeutral={handleNeutral} badText="bad" handleBad={handleBad}/>
      <Statistics title="statistics" good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App