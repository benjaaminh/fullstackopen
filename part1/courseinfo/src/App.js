const Header = (props) => {
return (
  <div>
    <h1>{props.course}</h1>
  </div>
)
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} number={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} number={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} number={props.parts[2].exercises}/>
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
      <p>Number of exercises {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}</p>
    </div>
  )
  }

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
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default App