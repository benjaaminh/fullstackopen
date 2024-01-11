import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

// function that takes care of manipulating cache for frontend
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same book twice
  const uniqByTitle = (a) => {//to make books unique by title
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)// if seen, make false, otherwise add
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}


const App = () => {
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  const bookresult = useQuery(ALL_BOOKS)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {//subscription for client
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)

    }
  })

  if (result.loading||bookresult.loading) {
    return <div>loading...</div>
  }

  if (result.error || bookresult.error) {//debug
    console.error('Error fetching data:', result.error || bookresult.error);
    return <div>Error fetching data</div>;
  }
  const books= bookresult.data.allBooks
  const authors = result.data.allAuthors//get authors from query

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
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>

      </div>

      <Authors show={page === 'authors'} authors={authors} setError={notify} token={token}/>
      <Notify errorMessage={errorMessage} />
      <Books show={page === 'books'} books={books}/>
      <NewBook show={page === 'add'} setError={notify} />
      <Recommended show={page === 'recommend'} books={books}/>
     
      
    </div>
  )
}

export default App
