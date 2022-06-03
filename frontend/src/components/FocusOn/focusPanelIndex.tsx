import React from 'react'
import ReactDOM from 'react-dom'
import FocusPanel from './focusPanel'

let el: any = null

// 创建消息提醒
const createFocusPanel = (type: number) => {
  el = document.createElement('div')
  document.body.appendChild(el)
  ReactDOM.render(<FocusPanel type={type} clickHandle={destroyFocusPanel} />, el)
}

// 销毁消息提醒
const destroyFocusPanel = () => {
  if (!el) return
  document.body.removeChild(el)
  ReactDOM.unmountComponentAtNode(el)
  el = null
}

// 消息提示
const showFocusPanel = (type: number): any => {
  // 保证只显示一个提示
  if (el) return null
  createFocusPanel(type)
}

export { showFocusPanel }
