import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const reduxStore = configureStore({  
    reducer: {
   notification: notificationReducer,
   blogs: blogReducer
             }})

export default reduxStore