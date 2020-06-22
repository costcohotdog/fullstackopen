import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
    <div>
      <h1>{props.text}</h1>
    </div>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => {
  return (
    <tr>
      <th>
        {props.text}
      </th>
      <td>
        {props.value}
      </td>
    </tr>
  )
}

const Statistics = (props => {
  const all = props.good + props.neutral + props.bad;
  const average = (props.good - props.bad) / all;

  if (all === 0) {
    return (
      <div>
        <p>no feedback given</p>
      </div>
    )
  } else {
      return (
        <div>
          <table>
            <tbody>
              <Statistic text='good' value={props.good} />
              <Statistic text='neutral' value={props.neutral} />
              <Statistic text='bad' value={props.bad} />
              <Statistic text='all' value={all} />
              <Statistic text='average' value={average} />
            </tbody>
          </table>
        </div>
      )
  }
})

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='give feedback'/>
      <Button text='good' handleClick= {() => setGood(good+1)} />
      <Button text='neutral' handleClick= {() => setNeutral(neutral+1)} />
      <Button text='bad' handleClick= {() => setBad(bad+1)} />
      <Header text='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)