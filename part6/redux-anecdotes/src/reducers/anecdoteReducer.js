import anecdoteService from "../services/anecdoteService"

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (id, time) => {
  return async dispatch => {
    const voted = await anecdoteService.update(id)
    dispatch({
      type: 'VOTE',
      data: voted
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, time * 1000)
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes
    })
  }
    
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE': {
      const anecdoteToVote = state.find(anecdote => anecdote.id === action.data.id)
      const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : votedAnecdote)
    }
    case 'NEW_ANECDOTE': {
      return [ ...state, action.data]
    }
    case 'INIT_ANECDOTE':
      return action.data
    default: return state
  }
}

export default anecdoteReducer