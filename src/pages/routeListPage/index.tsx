import React, { useState, useRef, useEffect } from 'react'
import BackIcon from 'src/components/BackIcon'
import testImg from 'assets/images/swiper-test.png'
import playIcon from 'assets/images/play-icon.png'
import izooIcon from 'assets/images/izoo-icon.png'
import './index.scss'

const RouteListPage = () => {
  console.log('RouteListPage')

  return (
    <div className="routeListPage">
      <BackIcon />
      <div className="head">讲解目录</div>
      <div className="routeList">
        <div className="routeListItem">
          <img src={testImg} className="routeCover" />
          <div className="num">01</div>
          <div className="text">为什么说“埃及是尼罗河的赠礼”</div>
          <img src={playIcon} className="playIcon" />
        </div>
        <div className="routeListItem">
          <img src={testImg} className="routeCover" />
          <div className="num">01</div>
          <div className="text">为什么说“埃及是尼罗河的赠礼”</div>
          <img src={playIcon} className="playIcon" />
        </div>
        <div className="routeListItem">
          <img src={testImg} className="routeCover" />
          <div className="num">01</div>
          <div className="text">为什么说“埃及是尼罗河的赠礼”</div>
          <img src={playIcon} className="playIcon" />
        </div>
        <img src={izooIcon} className="bottom-icon" />
      </div>
    </div>
  )
}

export default RouteListPage
