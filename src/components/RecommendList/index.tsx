import React, { useState } from 'react'
import SwiperTestImg from 'assets/images/swiper-test.png'
import ListHeader from '../ListHeader'
import Tag from '../Tag'
import './index.less'

interface Props {
  className?: string
}

function RecommendList(props: Props) {
  return (
    <div className={`recommendListContainer ${props.className}`}>
      <ListHeader title="热门推荐" hasBtn={false} className="listHeader" />
      <div className="recommendList">
        <div className="recommendItem">
          <div className="recommendItemContent">
            <img src={SwiperTestImg} />
            <div className="contentContainer">
              <p className="name">沪港银行历史展览馆</p>
              <p className="desc">理解银行货币和坎坷的中国近代经济</p>

              <div className="tagList">
                <div className="tag">科学发展</div>
                <div className="tag">文学艺术</div>
              </div>

              <p className="num">时长20分钟&nbsp;&nbsp;&nbsp;&nbsp;讲解20条</p>
            </div>
            <div className="listenBtn">进入收听</div>
          </div>
        </div>
        <div className="recommendItem">
          <div className="recommendItemContent">
            <img src={SwiperTestImg} />
            <div className="contentContainer">
              <p className="name">沪港银行历史展览馆</p>
              <p className="desc">理解银行货币和坎坷的中国近代经济</p>

              <div className="tagList">
                <Tag text="科学发展" className="tag" />
                <Tag text="文学艺术" className="tag" />
              </div>

              <p className="num">时长20分钟&nbsp;&nbsp;&nbsp;&nbsp;讲解20条</p>
            </div>
            <div className="listenBtn">进入收听</div>
          </div>
        </div>
      </div>
    </div>
  )
}

RecommendList.defaultProps = {
  className: '',
} as Partial<Props>

export default RecommendList
