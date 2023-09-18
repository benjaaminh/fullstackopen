import { createAnecdote, getAnecdotes, updateAnecdote } from '../requests'
import NotificationContext, { useNotificationDispatch } from './NotificationContext'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useReducer } from 'react'


const App = () => {
  const queryClient = useQueryClient()


  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })
const dispatch = useNotificationDispatch()
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote,votes: anecdote.votes+1})
  dispatch({type:"VOTE", payload: anecdote.content})//pass payload to reducer
  setTimeout(() => {
    dispatch({type:'REMOVE'})
  }, 5000)
  }



  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus:false //get request is not done when bar is clicked
  })
  console.log(JSON.parse(JSON.stringify(result)))


  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  else if(result.isError){
    return <div>anecdote service not available due to problems in server</div>
  }


  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
