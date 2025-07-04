const notificationStyle = {
    fontSize: '20px',
    backgroundColor: 'lightgray',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '5px 5px',
    margin: '10px 10px'
}

const Notification = ({ notification }) => {
    if ( !notification )
        return null
  
  return (
    <div style={ 
        notification.isSuccess 
            ? {...notificationStyle, color: 'green', borderColor: 'green'} 
            : {...notificationStyle, color: 'red', borderColor: 'red'}}
    >
        {notification.message}
    </div>
  )
}

export default Notification