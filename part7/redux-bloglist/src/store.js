import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const reduxStore = configureStore({  
    reducer: {
   notification: notificationReducer,
   blogs: blogReducer,
   user: userReducer
             }})

export default reduxStore