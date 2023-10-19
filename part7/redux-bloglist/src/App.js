import {  useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux"
import UserList from "./components/UserList";
import { initializeBlogs  } from "./reducers/blogReducer";
import { initializeUser, logout } from "./reducers/userReducer";
import Home from "./components/Home";
import User from "./components/User";
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
import { initializeUsers } from "./reducers/usersReducer";

const App = () => {

  const blogFormRef = useRef();

  const dispatch = useDispatch()

  useEffect(() => {
   dispatch(initializeBlogs())
   dispatch(initializeUser())
   dispatch(initializeUsers())
  }, [dispatch]);

const blogs = useSelector(({blogs}) =>{//bringing blogs from store
  return blogs
})

const user = useSelector(({user}) => {
  return user
})


const handleLogout= () => {
  dispatch(logout())
}

  const logoutButton = () => <button onClick={handleLogout}>logout</button>;

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  );

  const copy= [...blogs]
  const sortedBlogs = copy.sort((a, b) => b.likes - a.likes); //sorted blogs

  return (
    <div>
      <Notification/>
      {!user && ( //if no user is logged in:render this
        <div>
          <h2>Log in to application</h2>

          <LoginForm
          />
        </div>
      )}

      {user && ( //if a user is logged in, render this
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in {logoutButton()}
          </p>
          <h2>create new</h2>
          {blogForm()}
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
            />
          ))}
          <Routes>
        <Route path="/" element={<Home/>}/>
            <Route path="/users" element={<UserList/>}/>
            <Route path="/users/:id" element ={<User></User>}/>
          </Routes>
        </div>
      )}

    </div>
  );
};

export default App;
