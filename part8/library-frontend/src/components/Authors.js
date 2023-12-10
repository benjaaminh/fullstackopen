import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import BornForm from './BornForm'
const Authors = ({show,authors, setError, token }) => {

  if (!show) {
    return null
  }

  return (//render authors and data in table
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token ?  <BornForm setError={setError} authors={authors} /> : null} 
    </div>
  )
}

export default Authors
