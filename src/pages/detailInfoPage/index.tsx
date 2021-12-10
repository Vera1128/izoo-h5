import React, { useRef, useEffect } from 'react'
/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'

import FocusOnCom from 'components/FocusOn'
import { AudioGlobal } from 'src/modules/audio'

import SwiperTestImg from 'assets/images/swiper-test.png'
import HomeImg from 'assets/images/home.png'
import ShareImg from 'assets/images/share.png'
import HeartNormalImg from 'assets/images/heart-normal.png'

import 'swiper/css'
import 'swiper/css/pagination'
import './index.scss'

SwiperCore.use([Pagination])

const Index = () => {
  console.log('1')
  useEffect(() => {
    const audioList = [
      'https://izoo-h5.oss-cn-beijing.aliyuncs.com/2a8e81b6b53b3783f6248633ee96634f.m4a',
      'https://izoo-h5.oss-cn-beijing.aliyuncs.com/8d76354e48e275caf3e59630fa57993e.m4a',
    ]
    AudioGlobal.getInstance().audiosInit(audioList)
  }, [])
  const clickPlayAudio = () => {
    AudioGlobal.getInstance().audioPlay(
      'https://izoo-h5.oss-cn-beijing.aliyuncs.com/2a8e81b6b53b3783f6248633ee96634f.m4a',
    )
  }
  return (
    <div className="detailInfoPage">
      <Swiper
        slidesPerView="auto"
        className="mySwiper"
        watchSlidesProgress={true}
        pagination={{
          clickable: false,
        }}
        onSwiper={() => {}}
        initialSlide={0}
      >
        <SwiperSlide>
          <img src={SwiperTestImg} className="swiperContent" alt="轮播图" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={SwiperTestImg} className="swiperContent" alt="轮播图" />
        </SwiperSlide>
      </Swiper>
      <FocusOnCom />
      <div onClick={clickPlayAudio}>点击</div>
      <div className="emptyDiv" />
      <div className="detailPageMenu">
        <div className="menuContainer">
          <img src={HomeImg} className="homeIcon" />
          <p className="menuText">首页</p>
        </div>
        <div className="menuContainer menuContainerMargin">
          <img src={ShareImg} className="shareIcon" />
          <p className="menuText">分享</p>
        </div>
        <div className="menuContainer menuContainerMargin">
          <img src={HeartNormalImg} className="heartIcon" />
          <p className="menuText">收藏</p>
        </div>
        <div className="buyContainer">
          <div className="buyItem">
            <p>直接购买</p>
            <p>￥ 108</p>
          </div>
          <div className="buyItem">
            <p>2人拼团</p>
            <p>￥ 88</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
