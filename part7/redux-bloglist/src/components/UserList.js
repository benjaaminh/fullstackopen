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
const UserList = () =>{

    const users = useSelector(({users}) => {
        return users

      })

    return (
    <div>
        <h2>users</h2>
        <table>
            <tbody>
                <tr>
                <td></td> {/*empty cell to make the second above amount*/}
                <td>blogs created</td>
                </tr>
            {users.map(user => <tr key={user.id}>
               <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
                
                </td>
              
                <td>
                    {user.blogs.length}
                </td>
               
            </tr>)}
            </tbody>
        </table>
    </div>
)}
export default UserList