import React, { useEffect } from 'react'

import emptyPic from 'src/assets/empty.png'
import './index.scss'

const Index: React.FC<any> = ({
  text = '页面加载出错了啦～',
  errMsg,
}) => {

  useEffect(() => {
    if (errMsg) {
      // 上报错误信息
      // console.log('errMsg: ', errMsg)
    }
  }, [errMsg])

  return (
    <div className="empty__component">
      <div className="content">
        <img src={emptyPic} alt="" />
        <p className="text">{text}</p>
        { errMsg ? <p className="errorContent">{errMsg}</p> : null }
      </div>
    </div>
  )
}

export default Index
