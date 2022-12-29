const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  
  const notificationStyle = {color: 'blue'}
  
  return (
    <div style={notificationStyle} className='error'><p>{message}</p></div>
  )
}

export default Notification