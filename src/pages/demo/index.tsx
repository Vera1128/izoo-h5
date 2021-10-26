import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './index.less'

const Index = () => {
  const [state, setState] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setState(2)
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="wrap">
      我是demo页~11
      <span>{state}</span>
      <br/>
      <Link to="/"><span>点我去主页</span></Link>
    </div>
  )
}

export default Index
