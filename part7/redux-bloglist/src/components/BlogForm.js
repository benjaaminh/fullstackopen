import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
const BlogForm = () => {
  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    };
    event.target.url.value = "";
    event.target.author.value = "";
    event.target.title.value = "";

    dispatch(createBlog(blogObject));
    dispatch(setNotification(`${blogObject.title} created`, 5));
  };

  return (
    <div>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control type="text" name="title" />
          <Form.Label>author:</Form.Label>
          <Form.Control name="author" type="text" />
          <Form.Label>url:</Form.Label>
          <Form.Control name="url" />
          <Button variant="primary" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default BlogForm;
