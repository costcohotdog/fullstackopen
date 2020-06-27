import React from 'react'

const Course = (props) => {
  return (
    <div>
      <Header text={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
};

const Header = (props) => <h2>{props.text}</h2>

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

export default Course