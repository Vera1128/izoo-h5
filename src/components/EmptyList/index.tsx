import React from 'react'
import './index.scss'

interface Props {
  classname?: string
  text?: string
}

function EmptyList(props: Props) {
  const { classname, text } = props

  return <div className={`emptyList ${classname}`}>{text}</div>
}

EmptyList.defaultProps = {
  classname: '',
  text: '列表为空',
} as Partial<Props>

export default EmptyList
