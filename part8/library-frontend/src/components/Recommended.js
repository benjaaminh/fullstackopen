import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { USER } from '../queries'
const Recommended = ({show, books}) => {
    const result = useQuery(USER)

    if (result.loading) {
        return <div>loading...</div>
      }
    
      if (result.error ) {//debug
        console.error('Error fetching data:', result.error);
        return <div>Error fetching data</div>;
      }
    const favoriteGenre=result.data.me.favoriteGenre
    const favorites = books.filter(b=>b.genres.includes(favoriteGenre))
  if (!show) {
    return null
  }

 
  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{favoriteGenre}</b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favorites.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
          
        </tbody>

      </table>
   
    </div>
  )
}

export default Recommended
