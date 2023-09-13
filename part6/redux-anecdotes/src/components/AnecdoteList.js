import { useDispatch, useSelector } from 'react-redux'
import { giveVote } from '../reducers/anecdoteReducer'
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
  
    const vote = (id) => {
        console.log('vote', id)
        dispatch(giveVote(id))
      }
  
    
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)//sorted anecdotes by votes

    return (
        <div>
        {sortedAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )} 
          </div> 
    )
}
export default AnecdoteList