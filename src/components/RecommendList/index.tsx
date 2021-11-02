import React, { useState } from 'react'
import SwiperTestImg from 'assets/images/swiper-test.png'
import ListHeader from '../ListHeader'
import './index.less'

interface Props {
  className?: string
}

function RecommendList(props: Props) {
  return (
    <div className={`recommendListContainer ${props.className}`}>
      <ListHeader title="热门推荐" hasBtn={false} className="listHeader" />
      <div className="recommendList">1</div>
    </div>
  )
}

RecommendList.defaultProps = {
  className: '',
} as Partial<Props>

export default RecommendList
