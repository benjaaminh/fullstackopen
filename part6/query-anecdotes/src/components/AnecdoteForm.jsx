import {  useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../../requests'
import NotificationContext, { useNotificationDispatch } from '../NotificationContext'
import { useContext } from 'react'
const AnecdoteForm = () => {

  
  const queryClient = useQueryClient()


  const newAnecdoteMutation = useMutation(createAnecdote,{
    onSuccess: () =>{
    //  const anecdotes= queryClient.getQueryData('anecdotes')
    //  queryClient.setQueryData('anecdotes',anecdotes.concat(newAnecdote))
     queryClient.invalidateQueries({queryKey:['anecdotes']})
    }
  })


const dispatch = useNotificationDispatch()
 
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