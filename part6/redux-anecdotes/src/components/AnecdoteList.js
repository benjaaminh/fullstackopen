import { useDispatch, useSelector } from 'react-redux'
import {  voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteList = () => {


    const anecdotes = useSelector(({filter,anecdotes})=>{
        if (filter===''){
            return anecdotes
        
        }else{
      anecdotes = anecdotes.filter(anecdote=>
            anecdote.content.toLowerCase().indexOf(filter.toLowerCase())!==-1)
    
            return anecdotes
      }
    })
    const dispatch = useDispatch()
  
    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification((`you voted '${anecdote.content}'`),5))
      }
  
    const copy = [...anecdotes]
    const sortedAnecdotes = copy.sort((a, b) => b.votes - a.votes)//sorted anecdotes by votes

    return (
        <div>
        {sortedAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )} 
          </div> 
    )
}
export default AnecdoteList