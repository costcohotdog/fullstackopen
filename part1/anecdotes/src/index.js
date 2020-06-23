import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => <h1>{props.text}</h1>

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const HighestRated = (props) => {
  let i = props.votes.indexOf(Math.max(...props.votes));
  let voteSum = props.votes.reduce((acc, cur) => acc + cur)
  if (voteSum === 0) {
    return (
      <p>There have been no votes</p>
    )
  } else {
      return (
        <div>
          <p>{anecdotes[i]}</p>
          <p>has {props.votes[i]} votes</p>
        </div>
      )
  }
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))

  let newVote = (selected) => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  let newAnectdote = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber)
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      {props.anecdotes[selected]}
      <br></br>
      has {votes[selected]} votes
      <br></br>
      <Button handleClick={() => newVote(selected)} text='vote' />
      <Button handleClick={newAnectdote} text='new anecdote' />
      <Header text='Anecdote with most votes' />
      <HighestRated votes={votes} />       
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
