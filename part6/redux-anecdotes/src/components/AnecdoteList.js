import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return (
    <div>
      {anecdotes.sort((a,b) => b.votes - a.votes)
      .map(anecdote =>
        <Anecdote 
        key={anecdote.id}
        anecdote={anecdote}
        handleVote={() => dispatch(voteAnecdote(anecdote.id))}/>
      )}
    </div>
  )
}

export default Anecdotes