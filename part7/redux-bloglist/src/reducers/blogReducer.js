import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
const initialState = [

]


const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state,action){
      return action.payload
    },
    appendBlog(state,action){
      state.push(action.payload)
    },
    updateBlog(state,action){
      const updatedBlog = action.payload//updated anecdote
      const blogToVote = state.find(b=> b.id===updatedBlog.id)

      return state.map(b=>
        b.id !== blogToVote.id ? b :updatedBlog)   
    },
    removeBlog(state,action){
      const deletedBlog = action.payload 
      setBlogs(state.filter((b) => b.id !== deletedBlog.id));
    }
  },
})

export const {appendBlog, setBlogs,updateBlog,removeBlog} = blogSlice.actions

export const initializeBlogs = () =>{
  return async dispatch => {
    const blogs= await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = object => {
  return async dispatch => {
    const newBlog = await blogService.createNew(object)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = object => {
  return async dispatch => {
    const blogToDelete = await blogService.remove(object.id)
    dispatch(removeBlog(blogToDelete))
  }
}

export const likeBlog = (id,likedBlog) =>{

  return async dispatch =>{
    const updatedBlog = await blogService.update(id,likedBlog)
    dispatch(updateBlog(updatedBlog))
  }
}
export default blogSlice.reducer