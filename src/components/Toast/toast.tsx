import React, { FC } from 'react'
import './index.scss'

const Toast: FC = ({ children }) => (
  <div className="toast__component">
    <div className="container">{children}</div>
  </div>
)

Toast.defaultProps = {}

export default Toast