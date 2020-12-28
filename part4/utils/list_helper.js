const _ = require('lodash')

const dummy = (blogs) => {
  const result = blogs.length
  return result + 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((pre, cur) => {
    cur.likes > pre.likes ? cur : pre
  })

  const favBlog = {
    title: mostLikes.title,
    author: mostLikes.author,
    likes: mostLikes.likes,
  }

  return favBlog
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const groupedByAuthor = _.groupBy(blogs, 'author')
  const sortedMostBlogs = Object.keys(groupedByAuthor)
    .map(author => {
      return { author, blogs: groupedByAuthor[author] }
    })
    .sort((a, b) => b.blogs.length - a.blogs.length)
  return { author: sortedMostBlogs[0].author, blogs: sortedMostBlogs[0].blogs.length }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const groupedByAuthor = _.groupBy(blogs, 'author')
  const sortedMostLikes = Object.keys(groupedByAuthor)
    .map(author => {
      return { author, likes: totalLikes(groupedByAuthor[author]) }
    })
    .sort((a, b) => b.likes - a.likes)
  return { author: sortedMostLikes[0].author, likes: sortedMostLikes[0].likes }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}