import { useState } from 'react'
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const handleNextClick = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

 
 const [selected, setSelected] = useState(0)

 const copy = useState(new Array(anecdotes.length+1).join('0').split('').map(parseFloat))

 const [votes, setVotes] = useState(0)

 const copy1=[...copy] 


 const handleVoteClick = () => {
  setVotes(copy1[0][selected]+=1)
  }


  

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {copy1[0][selected]} votes</p>
      <Button handleClick={handleVoteClick} text='vote'  />
      <Button handleClick={handleNextClick} text='next anecdote'/>
    </div>
  )
}

const Button = ({ handleClick, text }) => (  
  
  <button onClick={handleClick}>
        {text}  
  </button>
  )

export default App