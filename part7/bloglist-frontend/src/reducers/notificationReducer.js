let timeout
export const notificationMessage = message => {
  return async dispatch => {
    if(timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    timeout = setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' })
    }, 5000)
    dispatch({
      type: 'DISPLAY',
      notification: message
    })
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case ('DISPLAY'):
    return action.message
  case ('REMOVE_NOTIFICATION'):
    return ''
  default:
    return state
  }
}

export default notificationReducer