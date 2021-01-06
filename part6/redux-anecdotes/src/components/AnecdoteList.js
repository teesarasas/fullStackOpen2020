import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationMessage } from '../reducers/notificationReducer'

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

const Anecdotes = (props) => {
  const displayAnecdotes = () => {
    const filter = props.anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase()
      .includes(props.filter.toLowerCase()))

    if (filter.length === 0) {
      return props.anecdotes
    } else {
      return filter
    }
  }

  return (
    <div>
      {displayAnecdotes().sort((a,b) => b.votes - a.votes)
      .map(anecdote =>
        <Anecdote 
        key={anecdote.id}
        anecdote={anecdote}
        handleVote={() => {props.voteAnecdote(anecdote.id, 5)
          props.notificationMessage(`you voted ${anecdote.content}`, 5)}
        }/>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  notificationMessage
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)

export default ConnectedAnecdotes