import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux"
import {setNotification } from "./reducers/notificationReducer"
import { initializeBlogs, likeBlog } from "./reducers/blogReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const dispatch = useDispatch()

  useEffect(() => {
   dispatch(initializeBlogs())
  }, [dispatch]);

const blogs = useSelector(({blogs}) =>{//bringing blogs from store
  return blogs
})

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      dispatch(setNotification(("failed: wrong username or password"),5))
    }
  }


  const logoutButton = () => <button onClick={handleLogout}>logout</button>;

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };



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
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
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
        </div>
      )}
    </div>
  );
};

export default App;
