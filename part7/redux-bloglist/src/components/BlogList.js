import Blog from "./Blog"
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
const BlogList = () => {
    const blogs = useSelector(({blogs}) =>{//bringing blogs from store
        return blogs
      })
      const user = useSelector(({user}) => {
        return user
      })

      const copy= [...blogs]
  const sortedBlogs = copy.sort((a, b) => b.likes - a.likes); //sorted blogs

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

return (
<div>
{sortedBlogs.map(blog=>
<li style = {blogStyle} key ={blog.id}> 
<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
</li>)}
  </div>
  )
}
export default BlogList
