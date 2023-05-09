const Header = ({coursename}) => {
    return (
      <div>
        <h2>{coursename}</h2>
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
  
  export default Course