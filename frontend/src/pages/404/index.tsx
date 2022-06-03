import React from 'react'
import useDidMount from '@tgu/usedidmount'
import emptyPic from 'src/assets/empty.png'
import './index.scss'

const NotFound: React.FC = () => {

  useDidMount(() => {
    // 访问路径出错 - 上报错误
  })

  return (
    <div className="notfound__component">
      <div className="content">
        <img src={emptyPic} alt="" />
        <p>您访问的页面不存在～</p>
      </div>
    </div>
  )
}

export default NotFound
