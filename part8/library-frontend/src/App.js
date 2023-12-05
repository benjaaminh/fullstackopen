import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import Notify from './components/Notify'
import BornForm from './components/BornForm'
const App = () => {
  const result = useQuery(ALL_AUTHORS)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  if (result.loading){
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors//get authors from query
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(()=> {
      setErrorMessage(null)
    },10000)
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={authors} />
      <Notify errorMessage={errorMessage}/>
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'}  setError={notify}/>
      <BornForm setError={notify} authors={authors}/>
    </div>
  )
}

export default App