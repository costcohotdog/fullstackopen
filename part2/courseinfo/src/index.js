import React from 'react'
import ReactDOM from 'react-dom'

const Course = (props) => {
  return (
    <div>
      <Header text={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
};

const Header = (props) => <h1>{props.text}</h1>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ parts }) => {
  const total = parts.map(part=>part.exercises).reduce((sum, next) => (sum + next));
  return (
    <strong>Total of {total} exercises</strong>
  )
}

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
      }
    ]
  }

  return <Course course={course} />
}

// return (
//   <div>
//     <Header course={course} />
//     <Content parts={course.parts} />
//     <Total parts={course.parts} />
//   </div>
// )

ReactDOM.render(<App />, document.getElementById('root'))
