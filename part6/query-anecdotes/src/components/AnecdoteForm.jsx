import {  useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../../requests'
import  { useNotificationDispatch } from '../NotificationContext'
const AnecdoteForm = () => {

  
  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote,{
    onSuccess: () =>{
    queryClient.invalidateQueries({queryKey:['anecdotes']})
    },
    onError: () =>{
dispatch({type:"ERROR"})
    setTimeout(() => {
      dispatch({type:'REMOVE'})
    }, 5000)
  }
  })

 
const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content,votes:0})
    dispatch({type:'CREATE', payload:content})
    setTimeout(() => {
      dispatch({type:'REMOVE'})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
