import { useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import UserList from "./components/UserList";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, logout } from "./reducers/userReducer";
import Home from "./components/Home";
import User from "./components/User";
import { Button, Navbar, Nav } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import { initializeUsers } from "./reducers/usersReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    dispatch(initializeUsers());
  }, [dispatch]);

  const user = useSelector(({ user }) => {
    return user;
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  const logoutButton = () => <Button onClick={handleLogout}>logout</Button>;

  const padding = {
    padding: 5,
  };

  return (
    <div className="container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                home
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user ? (
                <em style={padding}>
                  {user.username} logged in {logoutButton()}
                </em>
              ) : (
                <Link style={padding} to="/login">
                  login
                </Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Notification />
      {!user && ( //if no user is logged in:render this
        <div>
          <h2>Log in to application</h2>

          <LoginForm />
        </div>
      )}

      {user && ( //if a user is logged in, render this
        <div>
          <h2>blogs app</h2>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<User></User>} />
            <Route path="/blogs/:id" element={<Blog></Blog>} />
            <Route path="/login" elemet={<LoginForm></LoginForm>} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
