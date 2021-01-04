import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationMessage } from '../reducers/notificationReducer'
import { removeMessage } from '../reducers/notificationReducer'

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
  const anecdotes = useSelector(state => {
    const filtered = state.anecdotes.filter(anecdote => anecdote.content.toLowerCase()
                                                        .includes(state.filter.toString().toLowerCase()))
    if (filtered.length === 0) {
      return state.anecdotes
    } else {
      return filtered
    }
  })

  return (
    <div>
      {anecdotes.sort((a,b) => b.votes - a.votes)
      .map(anecdote =>
        <Anecdote 
        key={anecdote.id}
        anecdote={anecdote}
        handleVote={() => {dispatch(voteAnecdote(anecdote.id))
          dispatch(notificationMessage(`you voted ${anecdote.content}`))
          setTimeout(() => {
            dispatch(removeMessage())
          }, 5000)}
        }/>
      )}
    </div>
  )
}

export default Anecdotes