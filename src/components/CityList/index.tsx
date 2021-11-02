import React, { useState } from 'react'
import SwiperTestImg from 'assets/images/swiper-test.png'
import ListHeader from '../ListHeader'
import './index.less'

interface Props {
  className?: string
}

function CityList(props: Props) {
  const clickMoreHandle = () => {
    console.log('更多')
  }
  return (
    <div className={`cityListContainer ${props.className}`}>
      <ListHeader title="城市路线" clickHandle={clickMoreHandle} />
      <div className="cityList">
        <img className="cityItem" src="" />
        <img className="cityItem" src="" />
        <img className="cityItem" src="" />
        <img className="cityItem" src="" />
        <img className="cityItem" src="" />
        <img className="cityItem" src="" />
        <img className="cityItem" src="" />
        <img className="cityItem" src="" />
        <img className="cityItem" src="" />
        <img className="cityItem" src="" />
        <img className="cityItem" src="" />
        <img className="cityItem" src="" />
        <img className="cityItem" src="" />
        <img className="cityItem" src="" />
        <img className="cityItem" src="" />
      </div>
    </div>
  )
}

CityList.defaultProps = {
  className: '',
} as Partial<Props>

export default CityList
