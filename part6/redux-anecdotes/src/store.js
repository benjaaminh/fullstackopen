import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'


const reduxStore = configureStore({  
    reducer: {
   anecdotes:anecdoteReducer,
   filter: filterReducer
             }})

export default reduxStore