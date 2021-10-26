import React from 'react'
import HomeSkeleton from './home'

const Skeleton = () => {
  // 匹配路由，渲染出对应的骨架
  if (window.location.href.match(/\/consume/)) {
    return <HomeSkeleton />
  }
  return <HomeSkeleton />
}

export default Skeleton
