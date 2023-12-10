import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR } from '../queries'

const BornForm = ({authors,setError}) => {
  const [name, setName] = useState('')//set default name for select, so we dont have to change it manually
  const [born, setBorn] = useState('')

  const [ changeBirthYear, result ] = useMutation(EDIT_AUTHOR)//result is gotten from when born is changed

  const submit = (event) => {
    event.preventDefault()

    changeBirthYear({ variables: { name, born } })
    setBorn('')
  }

  useEffect(()=>{
    if (result.data && result.data.editAuthor === null){//if result is null, meaning name was not entered
        setError('author not found')
    }
  }, [result.data])//second parameter to display this everytime result.data changes

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
            <select onChange={({target})=>setName(target.value)}>{/*when changed, set name*/}
              {/*map authors to all options*/}  {authors.map(a=> 
                    <option key={a.name}>{/*key is name*/}
                        {a.name}
                    </option>)}
            </select>
        </div>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BornForm