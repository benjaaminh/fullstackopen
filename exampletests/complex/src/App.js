import { useState } from 'react'


const Button = ({ handleClick, text }) => (  
  
  <button onClick={handleClick}>
        {text}  
        </button>)


const History = (props) => { if (props.allClicks.length === 0) 
  
  { return (<div>        
    the app is used by pressing the buttons     
    </div>) } 
  return (<div>
          button press history: {props.allClicks.join(' ')}    
          </div>) }

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
    setTotal(left + right)
  }


  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />      
      <Button handleClick={handleRightClick} text='right' />
      {right}  
      <History allClicks={allClicks} />
      </div>
  )
}

export default App