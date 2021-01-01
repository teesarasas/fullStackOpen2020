import React, { useState } from 'react'

const Blog = ({ blog, user, updateLikes, deleteBlog, }) => {
  const [viewHide, setViewHide] = useState(true)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleViewHide = () => (
    setViewHide(!viewHide)
  )

  const viewBlog = () => {
    return (
      <div className="blog">
        {blog.url}<br />
        likes {blog.likes} <button className="likesButton" onClick={updateLikes}>like</button><br />
        {user.name}<br />
        {blog.user.username === user.username &&
        <button onClick={deleteBlog}>remove</button>
        }
      </div>
    )
  }

  return (
    <div style={blogStyle} className='blogRender'>
      {blog.title} {blog.author} {blog.url} <button className="viewHide" onClick={() => {toggleViewHide()}}>{viewHide ? 'view' : 'hide'}</button>
      {viewHide === false && viewBlog()}
    </div>
  )
}

export default Blog
