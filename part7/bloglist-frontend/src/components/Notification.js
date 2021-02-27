import React from 'react'
import { useSelector } from 'react-redux'

const Notificaiton = ({ status }) => {
  const notification = useSelector(state => state.notification)
  return (
    <div className={status}>
      {notification}
    </div>
  )
}

export default Notificaiton