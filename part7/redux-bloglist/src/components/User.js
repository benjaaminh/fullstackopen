import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";

const User = () => {
  const users = useSelector(({ users }) => {
    return users;
  });

  const match = useMatch("/users/:id");

  const user = match
    ? users.find((user) => user.id === String(match.params.id)) //OBS! string, not number
    : null;

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default User;
