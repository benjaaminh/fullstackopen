import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
 
const [title, setTitle] =useState('')
const [author, setAuthor] =useState('')
const [url, setUrl] =useState('')

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
  
  
  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const logoutButton = () => (
    <button onClick={handleLogout}>logout</button>
  )

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handlePostCreation = async (event) => {
event.preventDefault()
const blogObject = {
  title: title,
  author: author,
  url: url
}

const blog= await blogService
.create(blogObject)
setBlogs(blogs.concat(blog))
setNotification(`a new blog ${blog.title} by ${blog.author} was added`)
setTimeout(() => {
  setNotification(null)
}, 5000)
setTitle("")
setAuthor("")
setUrl("")
}

  

  
  const postForm = () =>(
    <form onSubmit={handlePostCreation}>
      <div>
        title:
        <input
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit"> create</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      
      <p>{user.name} logged in  {logoutButton()}</p>
      <h2>create new</h2>
      {postForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App