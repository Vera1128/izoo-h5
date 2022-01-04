import React, { useState, useRef, useEffect } from 'react'
import BackIcon from 'src/components/BackIcon'
import testImg from 'assets/images/swiper-test.png'
import playIcon from 'assets/images/play-icon.png'
import izooIcon from 'assets/images/izoo-icon.png'
import './index.scss'

const RouteListPage = ({
  history,
  location: {
    query: { catalogList },
  },
}) => {
  console.log('RouteListPage', catalogList)
  const backToDetailInfoPage = () => {
    history.go(-1)
  }
  const goToRouteDetail = () => {
    history.push(`/routeDetailPage`)
  }
  return (
    <div className="routeListPage">
      <BackIcon clickHandle={backToDetailInfoPage} />
      <div className="head">讲解目录</div>
      <div className="routeList">
        {(catalogList || []).map((catalog, index) => (
          <div className="routeListItem" onClick={goToRouteDetail} key={catalog.subId}>
            <img src={testImg} className="routeCover" />
            <div className="num">{`0${index + 1}`.slice(-2)}</div>
            <div className="text">{catalog.title}</div>
            <img src={playIcon} className="playIcon" />
          </div>
        ))}
        <img src={izooIcon} className="bottom-icon" />
      </div>
    </div>
  )
}

export default RouteListPage
