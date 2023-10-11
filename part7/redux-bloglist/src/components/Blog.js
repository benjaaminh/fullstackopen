import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "../reducers/notificationReducer";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";

const Blog = ({ blog, handleDelete, user }) => {
  const [visible, setVisible] = useState(false);
  const [correctUser, setCorrectUser] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" }; //visible=true will display element
  const showWhenCorrectUser = { display: correctUser ? "" : "none" };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const buttonText = visible ? "hide" : "view";

const dispatch = useDispatch()

  const toggleView = () => {
    setVisible(!visible);
    if (blog.user.username === user.username) {
      setCorrectUser(!correctUser);
    }
  };

  const updateLikes = () => {
    const updatedBlog={
      ...blog,
      likes:blog.likes+1
    }
    dispatch(likeBlog(blog.id,updatedBlog))
    dispatch(setNotification(("helo"),5))
    };

  const handleBlogRemoval = () => {
    if (
      window.confirm(
        `do you want to delete '${blog.title} by ${blog.title}'?`,
      )
    ) {
      dispatch(deleteBlog(blog))
    }
  };

  return (
    <div className="blog" style={blogStyle}>
      <div className="hidden">
        {blog.title} {blog.author}
        <button id="view-button" onClick={toggleView}>
          {buttonText}
        </button>
      </div>
      <div className="visible" style={showWhenVisible}>
        {" "}
        {/*when visible=true, shows this part*/}
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{" "}
          <button id="like-button" onClick={updateLikes}>
            like{" "}
          </button>
        </div>
        <div>{blog.user.name}</div>
        <div style={showWhenCorrectUser}>
          <button id="remove-button" onClick={handleBlogRemoval}>
            remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
