import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux"
import { login } from "../reducers/userReducer";
import { initializeBlogs } from "../reducers/blogReducer";

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = (event) =>{
    event.preventDefault()
    const username=event.target.username.value
    const password=event.target.password.value
    event.target.username.value=''
    event.target.password.value=''
    dispatch(login(username,password))
    }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            name="username"
          />
        </div>
        <div>
          password
          <input
            id="password"
            name="password"
            type="password"
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  //username: PropTypes.string.isRequired,
//  password: PropTypes.string.isRequired,
};

export default LoginForm;
