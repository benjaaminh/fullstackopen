import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { likeBlog } from "../reducers/blogReducer";
import { useSelector } from "react-redux";

import { useMatch } from "react-router-dom";
import BlogComment from "./BlogComments";
const Blog = () => {
  const dispatch = useDispatch();

  const blogs = useSelector(({ blogs }) => {
    return blogs;
  });
  const match = useMatch("/blogs/:id");

  const blog = match
    ? blogs.find((blog) => blog.id === String(match.params.id)) //OBS! string, not number
    : null;

  if (!blog) {
    return null;
  }

  const updateLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(likeBlog(blog.id, updatedBlog));
    dispatch(setNotification(`${blog.title} liked`, 5));
  };

  return (
    <div className="blog">
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
      <BlogComment id={blog.id} />
    </div>
  );
};

export default Blog;
