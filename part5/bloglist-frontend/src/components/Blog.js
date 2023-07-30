import {useState } from 'react'

const Blog = ({blog}) => {
  const [visible,setVisible] =useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' } 
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
const buttonText= visible ? "hide" : "view"

  const toggleView= () => {
    setVisible(!visible)
    }
      return(
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={toggleView}>{buttonText}</button>
        <div style={showWhenVisible}> {/*when visible=true, shows this part*/}
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button>like</button></div>
        <div>{blog.user.name}</div>
        </div>
        </div>
      )
    }


export default Blog