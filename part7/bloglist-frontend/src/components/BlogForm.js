import React, { useState } from 'react'


const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>

        <label>
        title:
          <input id='title'
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </label>
        <br />
        <label>
        author:
          <input id='author'
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </label>
        <br />
        <label>
        url:
          <input id='url'
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </label>
        <br />
        <button id="create-button" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm