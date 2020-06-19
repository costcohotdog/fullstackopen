import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}
      </p>
    </div>
  )
}

const App = () => {
  return(
    <>
      <h1>Greetings</h1>
      <Hello name="John" />
      <Hello name="Alison" />
    </>
  ) 
}

ReactDOM.render(<App />, document.getElementById('root'))