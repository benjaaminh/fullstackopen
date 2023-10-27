import BlogForm from "./BlogForm";
import BlogList from "./BlogList";
import { useRef } from "react";
import Togglable from "../components/Togglable";
const Home = () => {
  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  );

  return (
    <div>
      <h2>create new</h2>
      {blogForm()}
      <BlogList></BlogList>
    </div>
  );
};
export default Home;
