import { useSelector } from "react-redux"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch
  } from "react-router-dom"
  
const User = () => {
    const users = useSelector(({users}) => {
        return users
      })

      const match = useMatch('/users/:id')

  const user = match
    ? users.find(user => user.id === String(match.params.id)) //OBS! string, not number
    : null
    console.log(user)
    if (!user) {
      return null
    }
    
  
    return (
      <div>
        <h2>{user.name}</h2>
        <h2>added blogs</h2>
       {user.blogs.map(blog=><li key={blog.id}>{blog.title}</li>)}
      </div>
    )
  }
  export default User