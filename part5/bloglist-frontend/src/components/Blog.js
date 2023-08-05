import { useState } from 'react'

const Blog = ({ blog,updateLikes,handleDelete, user }) => {
  const [visible,setVisible] =useState(false)
  const [correctUser,setCorrectUser]= useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' } //visible=true will display element
  const showWhenCorrectUser= { display: correctUser? '': 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const buttonText= visible ? 'hide' : 'view'

  const toggleView= () => {
    setVisible(!visible)
    if (blog.user.username===user.username){
      setCorrectUser(!correctUser)
    }
  }


  const  handleLikes = () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateLikes(blog.id,updatedBlog)
  }

  const handleBlogRemoval = () => {
    handleDelete(blog)
  }


  return(
    <div className='blog' style={blogStyle}>
      <div className='hidden'>
      {blog.title} {blog.author}
      <button onClick={toggleView}>{buttonText}</button>
      </div>
      <div className='visible' style={showWhenVisible}> {/*when visible=true, shows this part*/}
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleLikes}>like </button></div>
        <div>{blog.user.name}</div>
        <div style={showWhenCorrectUser}>
          <button onClick={handleBlogRemoval}>remove</button>
        </div>
      </div>
    </div>
  )
}


export default Blog