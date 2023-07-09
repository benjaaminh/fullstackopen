const dummy = (blogs) => {
    return 1
  }
  

  const totalLikes = (blogs) => {
    const likes = blogs.map(blog=>blog.likes)
    const sum= likes.reduce((sum,item)=>sum+item,0)
    return sum
  }

  module.exports = {
    dummy,
    totalLikes
  }