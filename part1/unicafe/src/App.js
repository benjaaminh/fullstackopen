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
      <Statistics valuegood={good} textgood='good'
      valueneutral={neutral} textneutral='neutral'
      valuebad={bad} textbad='bad'
      valuetotal={total} texttotal='total'
      valueaverage={average/total} textaverage='average'
      valuepositive={good/total*100} textpositive='positive' symbol='%' />
    </div>
  )
}

const Button = ({ handleClick, text }) => (  
  
<button onClick={handleClick}>
      {text}  
</button>)

const Statistics = (props) => { if (props.number4===0)
  {return (<div>No feedback given</div>)}
  return(
 <table>
  <tbody>
  <tr>
    <td><StatisticLine text={props.textgood}/></td>
    <td><StatisticLine value={props.valuegood}/></td>
  </tr>
<tr> 
  <td><StatisticLine text={props.textneutral}/></td>
  <td><StatisticLine value={props.valueneutral}/></td>
</tr>
<tr> 
  <td><StatisticLine text={props.textbad}/></td>
  <td><StatisticLine value={props.valuebad}/></td>
</tr>
<tr> 
  <td><StatisticLine text={props.texttotal}/></td>
  <td><StatisticLine value={props.valuetotal}/></td>
</tr>
<tr> 
  <td><StatisticLine text={props.textaverage}/></td>
  <td><StatisticLine value={props.valueaverage}/></td>
</tr>
<tr> 
  <td><StatisticLine text={props.textpositive}/></td>
  <td><StatisticLine value={props.valuepositive} symbol={props.symbol}/></td>
</tr>
</tbody>
 </table>)
}
const StatisticLine = ({value,text,symbol}) => <div>{text} {value} {symbol}</div>


export default App