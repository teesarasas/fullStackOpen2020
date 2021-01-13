import React from 'react'
import AnecdoteList from './AnecdoteList'
import About from './About'
import CreateNew from './CreateNew'
import { BrowserRouter as Router,
  Switch, Route, Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>

      <Switch>
        <Route path="/create">
          <CreateNew />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/">
          <AnecdoteList />
        </Route>
      </Switch>
    </Router>
  )
}

export default Menu;