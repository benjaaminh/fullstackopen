import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)

const handleGoodClick = () => {
    setGood(good+1)
    setTotal(total+1)
    setAverage(average+1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total+1)
    setAverage(average)
  }

const handleBadClick = () => {
    setBad(bad + 1)
    setTotal(total+1)
    setAverage(average-1)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />      
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics number={good} text='good'/>
      <Statistics number={neutral} text='neutral'/>
      <Statistics number={bad} text='bad'/>
      <Statistics number={total} text='total'/>
      <Statistics number={average/total} text='average'/>
      <Statistics number={good/total*100} text='positive' symbol='%'/>
    </div>
  )
}

const Button = ({ handleClick, text }) => (  
  
<button onClick={handleClick}>
      {text}  
</button>)

const Statistics = ({number, text, symbol}) => <p>{text} {number} {symbol}</p> 


export default App