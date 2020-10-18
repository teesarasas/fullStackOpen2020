import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//Display header
const Header = ({ header }) => <h1>{header}</h1>

//Display anecdote
const Display = ({ value }) => <div>{value}</div>

const Button = ({ handleClick, text }) => (
  <button onClick = { handleClick }>{text}</button>
)

//Display highest voted anecdote
const MostVoted = ({ anecdote, voteArray}) => {
  const highestVoteindex = voteArray.indexOf(Math.max(...voteArray))

  return (
    <div>
      <p>{anecdote[highestVoteindex]}<br />
      has {voteArray[highestVoteindex]} votes </p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  //vote state
  const [voted, setVoted] = useState(new Array(props.anecdotes.length + 1).join('0').split('').map(parseFloat))

  //increment point of each quote
  const incrementVote = () => () => {
    let copyPoints = [...voted]
    copyPoints[selected] += 1
    return setVoted(copyPoints)
  }
  //random anecdotes quote
  const setAnecdote = index => setSelected(index)

  return (
    <div>
      <Header header="Anecdote of the day" />
      <Display value= {props.anecdotes[selected]} />
      <Button handleClick={incrementVote()} text="vote" />
      <Button handleClick={() => setAnecdote(Math.floor(Math.random() * props.anecdotes.length))} text="next anecdote" />
      <Header header="Anecdote with most votes" />
      <MostVoted anecdote={props.anecdotes} voteArray={voted} />
      
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