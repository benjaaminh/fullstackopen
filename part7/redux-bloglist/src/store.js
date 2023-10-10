import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'


const reduxStore = configureStore({  
    reducer: {
   notification: notificationReducer
             }})

export default reduxStore