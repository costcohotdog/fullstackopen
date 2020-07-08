import React from 'react'

const Names = (props) => {
    return(
      props.persons.map(person => 
      <Name key={person.name} person={person} filter={props.newFilter} deletePerson={props.deletePerson} />)
    )
  }
  
const Name = (props) => {
  const name = props.person.name.toLowerCase()
  if ( name.includes(props.filter.toLowerCase()) ) {
      return ( 
        <div>
          {props.person.name} {props.person.number} <button onClick={props.deletePerson} id={props.person.id}>Delete</button>
        </div> 
      )
  } else {
      return( <div></div> )
  }
}

export default Names