import Blog from "./Blog"
import { useSelector } from "react-redux"
const BlogList = () => {
    const blogs = useSelector(({blogs}) =>{//bringing blogs from store
        return blogs
      })
      const user = useSelector(({user}) => {
        return user
      })

      const copy= [...blogs]
  const sortedBlogs = copy.sort((a, b) => b.likes - a.likes); //sorted blogs
return (
<div>
{sortedBlogs.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      user={user}
    />
  ))}
  </div>
  )
}
export default BlogList
