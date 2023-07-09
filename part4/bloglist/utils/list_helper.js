const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const sum= likes.reduce((sum,item) => sum+item,0)
  return sum
}

const favoriteBlog= (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const max = Math.max(...likes)
  const blog = blogs[likes.indexOf(max)]
  return blog
}

const mostBlogs=(blogs) => {
  const names = blogs.map(blog => blog.author)
  var authorName = _.head(_(names)
    .countBy()
    .entries()
    .maxBy(_.last))

  const frequency= names.filter(x => x===authorName).length

  return ({
    author: authorName,
    blogs: frequency
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}