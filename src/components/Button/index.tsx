/*
 * @Description: 按钮组件
 * @Author: yangyang.xu
 * @Date: 2021-12-22 19:29:31
 * @LastEditTime: 2021-12-22 19:30:55
 */
import React from 'react'
import './index.less'

interface Props {
  className?: string
  children: JSX.Element | JSX.Element[] | string
}

function Button(props: Props) {
  return <div className={`button ${props.className}`}>{props.children}</div>
}

Button.defaultProps = {
  className: '',
} as Partial<Props>

export default Button
