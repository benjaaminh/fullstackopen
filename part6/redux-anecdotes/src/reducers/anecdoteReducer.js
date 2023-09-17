import { createSlice } from '@reduxjs/toolkit'
const initialState = [

]

const getId = () => (100000 * Math.random()).toFixed(0)





const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes:0
      })
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
    }
  },
})

export const {createAnecdote, giveVote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer