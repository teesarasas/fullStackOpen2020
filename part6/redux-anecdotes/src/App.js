import React from 'react'
import AnecdotesList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <AnecdotesList />
    </div>
  )
}

export default App