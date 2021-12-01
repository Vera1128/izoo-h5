import React from 'react'
import './index.scss'

interface Props {
  color?: string
}

function EmptyBottom(props: Props) {
  const { color } = props

  return <div className="emptyDiv" style={{ backgroundColor: color }} />
}

EmptyBottom.defaultProps = {
  color: 'white',
} as Partial<Props>

export default EmptyBottom
