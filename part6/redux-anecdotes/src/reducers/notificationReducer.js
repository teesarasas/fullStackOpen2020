export const notificationMessage = (message) => {
  return {
    type: 'DISPLAY',
    notification: {message}
  }
}

export const removeMessage = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'DISPLAY': 
      return action.notification.message
    case 'REMOVE_NOTIFICATION': 
      return ''
    default: return state
  }
}

export default notificationReducer