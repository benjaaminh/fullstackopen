import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { createComment, initializeComments } from "../reducers/commentReducer";
//import AddCommentForm from './AddCommentForm'

const BlogComment = ({ id }) => {
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeComments(id));
  }, [dispatch, id]);

  const addComment = async (event) => {
    event.preventDefault();
    const newComment = {
      content: event.target.content.value,
    };
    event.target.content.value = "";
    dispatch(createComment(id, newComment));
  };
  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <div>
          <input name="content" />
          <button type="submit">add comment</button>
        </div>
      </form>
      <p></p>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogComment;
