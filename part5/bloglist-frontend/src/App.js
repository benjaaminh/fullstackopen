import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  const [refreshBlogs, setRefreshBlogs] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [refreshBlogs]) //will render everytime state of refresh changes, meaning the blogs will refresh everytime a new one is added, since state of refreshblogs changes then




  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setNotification('failed: wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleDelete = async (blogObject) => {
    if (window.confirm(`do you want to delete '${blogObject.title} by ${blogObject.title}'?`)) {
      await blogService
        .remove(blogObject.id)
      setBlogs(blogs.filter(b => b.id !== blogObject.id))
    }
  }

  const logoutButton = () => (
    <button onClick={handleLogout}>logout</button>
  )

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const updateLikes = async (id, blogObject) => {
    const updatedBlog = await blogService
      .update(id, blogObject)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    setRefreshBlogs(!refreshBlogs) //to update view, so user is visible
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const blog = await blogService
      .create(blogObject)
    setBlogs(blogs.concat(blog))
    setRefreshBlogs(!refreshBlogs)
    setNotification(`a new blog ${blog.title} by ${blog.author} was added`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Notification message={notification} />
      {!user && //if no user is logged in:render this
        <div>
          <h2>Log in to application</h2>

          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </div>
      }


      {user && //if a user is logged in, render this
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in  {logoutButton()}</p>
          <h2>create new</h2>
          {blogForm()}
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateLikes={updateLikes} handleDelete={handleDelete} user={user} />

          )}
        </div>

      }
    </div>)
}

export default App