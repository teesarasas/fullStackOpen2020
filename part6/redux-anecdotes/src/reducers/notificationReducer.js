let timeout
export const notificationMessage = (message, time) => {
  return async dispatch => {
    console.log('Timeout is', timeout)
    if (timeout) {
      console.log('Clearing timeout')
      clearTimeout(timeout)
      timeout = null
    }
      timeout = setTimeout(() => {
      dispatch({type: 'REMOVE_NOTIFICATION'})
    }, time * 1000)
    dispatch({
      type: 'DISPLAY',
      notification: { message }
    })
  }
}

export const removeMessage = () => {
  return {type: 'REMOVE_NOTIFICATION'}
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