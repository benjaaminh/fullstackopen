import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
const initialState = [

]


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    setAnecdotes(state,action){
      return action.payload
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    updateAnecdote(state,action){
      const updatedAnecdote = action.payload//updated anecdote
      const anecdoteToVote = state.find(a=> a.id===updatedAnecdote.id)

      return state.map(a=>
        a.id !== anecdoteToVote.id ? a :updatedAnecdote)   
    }
  },
})

export const {appendAnecdote, giveVote, setAnecdotes,updateAnecdote} = anecdoteSlice.actions

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

export const voteAnecdote = (anecdote) =>{
  return async dispatch =>{
    const updatedAnecdote = await anecdoteService.vote(anecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}
export default anecdoteSlice.reducer