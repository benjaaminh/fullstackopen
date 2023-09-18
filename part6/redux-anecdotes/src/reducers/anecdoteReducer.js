import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
const initialState = [

]


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
     state.push(action.payload)
    },
  giveVote(state, action) {
      const anecdote = action.payload
      const anecdoteToVote = state.find(a=> a.id===anecdote.id)
      const changedAnecdote={
        ...anecdoteToVote,
        votes:anecdoteToVote.votes+1
      }
      return state.map(a=>
        a.id !== anecdote.id ? a :changedAnecdote)    
    },
    setAnecdotes(state,action){
      return action.payload
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    }
  },
})

export const {appendAnecdote, giveVote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () =>{
  return async dispatch => {
    const anecdotes= await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export default anecdoteSlice.reducer