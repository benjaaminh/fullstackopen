const Header = (props) => {
return (
  <div>
    <p>{props.course}</p>
  </div>
)
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.name1} number={props.number1}/>
      <Part name={props.name2} number={props.number2}/>
      <Part name={props.name3} number={props.number3}/>
    </div>
  )
  }

  const Part = (props) => {
    return (
      <div>
        <p>{props.name} {props.number}</p>
      </div>
    )
    }


const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  )
  }

//TEST
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name}/>
     <Content name1={course.parts[0].name} number1={course.parts[0].exercises}
     name2={course.parts[1].name} number2={course.parts[1].exercises}
     name3={course.parts[2].name} number3={course.parts[2].exercises}/>
      <Total total={course.parts[0].exercises+course.parts[1].exercises+course.parts[2].exercises}/>
    </div>
  )
}

export default App