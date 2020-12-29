import React from 'react'

const Notificaiton = ({ status, message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={status}>
      {message}
    </div>
  )
}

export default Notificaiton