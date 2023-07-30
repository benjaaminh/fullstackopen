import { useState } from 'react'
import App from '../App'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog ( {
      title: title,
      author: author,
      url: url,
    })
    setTitle("")
setAuthor("")
setUrl("")
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit"> create</button>
    </form>
  )
}

export default BlogForm