import React, { useState } from 'react'
import SwiperTestImg from 'assets/images/swiper-test.png'
import ListHeader from '../ListHeader'
import './index.less'

interface Props {
  className?: string
}

function NearbyList(props: Props) {
  const clickMoreHandle = () => {
    console.log('更多')
  }
  return (
    <div className={`nearbyListContainer ${props.className}`}>
      <ListHeader title="离你不远" clickHandle={clickMoreHandle} />
      <div className="nearbyList">
        <div className="nearbyItem">
          <img src={SwiperTestImg} />
          <div className="placeInfo">
            <div className="place">
              <span>武康路</span>
            </div>
            <span className="distance">13.2km</span>
          </div>
          <div className="desc">老洋房背后的历史变迁</div>
        </div>
        <div className="nearbyItem">
          <img src={SwiperTestImg} />
          <div className="placeInfo">
            <div className="place">
              <span>武康路</span>
            </div>
            <span className="distance">13.2km</span>
          </div>
          <div className="desc">老洋房背后的历史变迁</div>
        </div>
        <div className="nearbyItem">
          <img src={SwiperTestImg} />
          <div className="placeInfo">
            <div className="place">
              <span>武康路</span>
            </div>
            <span className="distance">13.2km</span>
          </div>
          <div className="desc">老洋房背后的历史变迁</div>
        </div>
        <div className="nearbyItem">
          <img src={SwiperTestImg} />
          <div className="placeInfo">
            <div className="place">
              <span>武康路</span>
            </div>
            <span className="distance">13.2km</span>
          </div>
          <div className="desc">老洋房背后的历史变迁</div>
        </div>
      </div>
    </div>
  )
}

NearbyList.defaultProps = {
  className: '',
} as Partial<Props>

export default NearbyList
