import React from 'react'
import { notify } from '@tgu/toast'
import './index.scss'

const TestPage: React.FC = () => {
  console.log('testPage')
  const clearBtnClickBtn = () => {
    localStorage.clear()
    notify('缓存清除成功！', 2000)
  }
  return (
    <div className="testPage">
      <button className="clearBtn" onClick={clearBtnClickBtn} type="button">
        点我清除缓存
      </button>
    </div>
  )
}

export default TestPage
