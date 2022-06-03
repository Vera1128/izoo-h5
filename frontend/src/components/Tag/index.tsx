import React from 'react'
import './index.less'

interface Props {
  className?: string
  text: string
}

function Tag(props: Props) {
  return <div className={`tag ${props.className}`}>{props.text}</div>
}

Tag.defaultProps = {
  className: '',
} as Partial<Props>

export default Tag
