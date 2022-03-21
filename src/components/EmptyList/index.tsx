/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2021-12-01 15:19:04
 * @LastEditTime: 2022-03-21 21:45:32
 */
import React from 'react'
import './index.scss'

interface Props {
  classname?: string
  children: JSX.Element | JSX.Element[] | string
}

function EmptyList(props: Props) {
  const { classname, children } = props

  return <div className={`emptyList ${classname}`}>{children}</div>
}

EmptyList.defaultProps = {
  classname: '',
} as Partial<Props>

export default EmptyList
