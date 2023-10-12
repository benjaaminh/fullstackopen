
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux"

const BlogForm = () => {
const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault();
const blogObject={
  title:event.target.title.value,
  author:event.target.author.value,
  url:event.target.url.value
}
  event.target.url.value=''
  event.target.author.value=''
  event.target.title.value=''

  dispatch(createBlog(blogObject))
  dispatch(setNotification((`${blogObject.title} created`),5))
}
  

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
      name="title"
        />
      </div>
      <div>
        author:
        <input
        name="author"
        />
      </div>
      <div>
        url:
        <input
         name="url"
        />
      </div>
      <button id="create-button" type="submit">
        create
      </button>
    </form>
  );
};

export default BlogForm;
