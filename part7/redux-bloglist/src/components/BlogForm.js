import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="write title text here"
        />
      </div>
      <div>
        author:
        <input
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="write author text here"
        />
      </div>
      <div>
        url:
        <input
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="write url text here"
        />
      </div>
      <button id="create-button" type="submit">
        create
      </button>
    </form>
  );
};

export default BlogForm;
