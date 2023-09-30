import { useState } from 'react'


export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = () => {
setValue('')
  }
 
  return {
    name,
    value,
    onChange,
    onReset
  }
}

// modules can have several named exports

export const useAnotherHook = () => {
  // ...
}