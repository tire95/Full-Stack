const Course = ({ course }) => {
    const Header = ({ name }) => <h1>{name}</h1> 

    const Total = ({ count }) => <p><b>Number of exercises {count}</b></p>
    
    const Content = ({ parts }) => {
      const Part = ({ part, exercises }) => <p>{part} {exercises}</p>
      
      return (
        parts.map(part => 
          <Part key={part.id} part={part.name} exercises={part.exercises}/> 
        )
      )
    }

    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total count={course.parts.map(part => part.exercises).reduce((s,p ) => s + p)}/>
      </div>
    )
    
}

export default Course