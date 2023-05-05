import { useState } from 'react'

//TODO: 
//state is sometimes weird, has to click twice to update state
//make names of objects instead of using Math.max...

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
 // copy1[0][selected]+=1
 console.log(Math.max(...copy1[0]))
 //console.log(copy1[0])
  }

  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {copy1[0][selected]} votes</div>
      <Button handleClick={handleVoteClick} text='vote'  />
      <Button handleClick={handleNextClick} text='next anecdote'/>
    <h1>Anecdote with most votes</h1>
    <p>{anecdotes[copy1[0].indexOf(Math.max(...copy1[0]))]}</p>
    </div>
  )
}
const Button = ({ handleClick, text }) => (  
  
  <button onClick={handleClick}>
        {text}  
  </button>
  )

export default App