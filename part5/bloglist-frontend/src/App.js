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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])




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
      setNotification('failed: wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  
  

  const logoutButton = () => (
    <button onClick={handleLogout}>logout</button>
  )

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  } 


const addBlog = async (blogObject) => {
  blogFormRef.current.toggleVisibility()
  const blog= await blogService
  .create(blogObject)
  setBlogs(blogs.concat(blog))
  setNotification(`a new blog ${blog.title} by ${blog.author} was added`)
  setTimeout(() => {
    setNotification(null)
  }, 5000)
}

const blogForm= () => (
  <Togglable buttonLabel='new blog' ref={blogFormRef}>
  <BlogForm createBlog={addBlog} />
</Togglable>
)
  

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} />
        <Togglable buttonLabel="log in">
        <LoginForm
        username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />

        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      
      <p>{user.name} logged in  {logoutButton()}</p>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App