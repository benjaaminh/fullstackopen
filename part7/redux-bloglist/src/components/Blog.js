import { useState } from "react";
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";
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
const Blog = () => {
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

const blogs = useSelector(({blogs}) => {
  return blogs
})
const match = useMatch('/blogs/:id')

const blog = match
  ? blogs.find(blog => blog.id === String(match.params.id)) //OBS! string, not number
  : null

  if (!blog) {
    return null
  }

  const updateLikes = () => {
    const updatedBlog={
      ...blog,
      likes:blog.likes+1
    }
    dispatch(likeBlog(blog.id,updatedBlog))
    dispatch(setNotification((`${blog.title} liked`),5))
    };

  const handleBlogRemoval = () => {
    if (
      window.confirm(
        `do you want to delete '${blog.title} by ${blog.author}'?`,
      )
    ) {
      dispatch(deleteBlog(blog))
    }
  };

  return (
    <div className="blog" >
    <div>
    <h2>{blog.title}</h2>
    </div>
        <div>
          <a href={blog.url}>{blog.url}</a>
          </div>
           {blog.likes} likes
          <button id="like-button" onClick={updateLikes}>
            like{" "}
          </button>
        <div>added by {blog.user.name}</div>
        <h3>comments</h3>
         
        
        </div>
  );
};

export default Blog;
