import React from 'react'

const Notification = props => {
    const goodNotificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
  
    const badNotificationStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  
    if (props.type === 'good') {
      return(
        <div style={goodNotificationStyle}>
          {props.message}
        </div>
      )
    } else if (props.type === 'bad') {
      return(
        <div style={badNotificationStyle}>
          {props.message}
        </div>
      )
    } else {
      return <div></div>
    }
}

export default Notification