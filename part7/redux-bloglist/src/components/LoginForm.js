import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    event.target.username.value = "";
    event.target.password.value = "";
    dispatch(login(username, password));
    navigate("/");
  };

  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control type="text" name="username" />
          <Form.Label>password:</Form.Label>
          <Form.Control name="password" type="password" />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
