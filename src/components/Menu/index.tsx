import React from 'react'
import './index.less'

interface Props {
  className?: string
  children: JSX.Element | JSX.Element[]
}

function MenuBar(props: Props) {
  return <div className={`menu ${props.className}`}>{props.children}</div>
}

MenuBar.defaultProps = {
  className: '',
} as Partial<Props>

export default MenuBar
