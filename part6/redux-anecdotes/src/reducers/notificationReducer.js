export const notificationMessage = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'DISPLAY',
      notification: { message }
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, time * 1000)
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