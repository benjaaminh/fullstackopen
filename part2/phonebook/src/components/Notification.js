const Notification = ({ message }) => {
    const notificationStyle = {
        color:'green',
        fontSize: 20,
        borderStyle: 'solid',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        background: 'lightgrey'
    }

    const errorStyle = {
      color:'red',
      fontSize: 20,
      borderStyle: 'solid',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
      background: 'lightgrey'
  }
    if (message === null) {
      return null
    }
    else if (message.includes('Information')){
      return (
        <div style={errorStyle}>
          {message}
        </div>
      )
    }
    else{
  
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
    }
  }


export default Notification