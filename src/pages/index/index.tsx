import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

const Index: FC<any> = () => (
  <div className="wrap">
    我是主页~
    <br/>
    <Link to="/demo"><span>点我去demo页</span></Link>
  </div>
)

export default Index
 