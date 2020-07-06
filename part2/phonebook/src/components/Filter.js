import React from 'react'

const Filter = (props) => {
    return( 
      <div>
        filter names:
        <input 
            value={props.newFilter} 
            onChange={props.filterChange}
        />
      </div>
    )
  }

export default Filter