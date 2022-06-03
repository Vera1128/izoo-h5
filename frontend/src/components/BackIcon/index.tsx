import React from 'react'
import backIcon from 'assets/images/back-icon.png'
import './index.scss'

interface Props {
  clickHandle: () => void
}

function BackIcon(props: Props) {
  const { clickHandle } = props

  return <img src={backIcon} onClick={clickHandle} className="backIcon" />
}

BackIcon.defaultProps = {
  clickHandle: () => {},
} as Partial<Props>

export default BackIcon
