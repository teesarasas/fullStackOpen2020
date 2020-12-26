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

module.exports = {
  dummy, totalLikes, favoriteBlog
}