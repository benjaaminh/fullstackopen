const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name:'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

const Header = ({coursename}) => {
  return (
    <div>
      <h1>{coursename}</h1>
    </div>
  )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
      {parts.map(part=><Part key={part.id} name={part.name} exercises={part.exercises}/>)}
      </div>
    )
    }
  
    const Part = ({name, exercises}) => {
      return (
        <div>
          <p>{name} {exercises}</p>
        </div>
      )
      }
  
 
  
  const Total = ({parts}) => {
    return (
      
      <div>
      <b>total of {parts.reduce((accumulator, currentValue) =>
       accumulator+currentValue.exercises,0)} exercises</b>
      </div>
    )
    }


const Course= ({course}) => {
  return( <div>
    <Header coursename={course.name}/>
    <Content parts={course.parts} />
    <Total parts={course.parts}/>
  </div>)}

export default App