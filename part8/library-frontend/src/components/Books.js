import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
const Books = ({show, books}) => {
  const [genre, setGenre] = useState("all")
  const [booksToShow, setBooksToShow] = useState(books)
  const genres = books.map(b=>b.genres).flat() //flatten into one array
  const genresNoDuplicates= [...new Set(genres)]//create a set from genres array to remove duplicates
  if (!show) {
    return null
  }

 
  const changeGenre = (g) => {
    setGenre(g)
    const filtered = books.filter(b=>b.genres.includes(g))
    setBooksToShow(filtered)
  }

  const resetGenre = () => {
    setGenre("all")
    setBooksToShow(books)
  }
 
  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{genre}</b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
          
        </tbody>

      </table>
      <button onClick={() => resetGenre()}>all</button>
      {genresNoDuplicates.map((g,index)=>( //index as second parameter for key to prevent duplicate keys 
      /*need to put () => in onClick!! otherwise it wont work to just put changeGenre(g)*/
            <button onClick={() => changeGenre(g)} key={index}>{g}</button>))}
    </div>
  )
}

export default Books
