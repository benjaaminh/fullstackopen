import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import Notify from './components/Notify'
import BornForm from './components/BornForm'
import LoginForm from './components/LoginForm'
const App = () => {
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  const bookresult = useQuery(ALL_BOOKS)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  if (result.loading||bookresult.loading) {
    return <div>loading...</div>
  }

  if (result.error || bookresult.error) {//debug
    console.error('Error fetching data:', result.error || bookresult.error);
    return <div>Error fetching data</div>;
  }
  const books= bookresult.data.allBooks
  const authors = result.data.allAuthors//get authors from query
  //problem: cant render when authors has object

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore() //clear cache
  }

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
        <LoginForm show={page === 'login'} setToken={setToken} setError={notify} />
        <Authors show={page === 'authors'} authors={authors} />
        <Books show={page === 'books'} books={books} />
      </>
    )
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>

      </div>

      <Authors show={page === 'authors'} authors={authors} />
      <Notify errorMessage={errorMessage} />
      <Books show={page === 'books'} books={books}/>
      <NewBook show={page === 'add'} setError={notify} />
      <BornForm setError={notify} authors={authors} />
    </div>
  )
}

export default App
