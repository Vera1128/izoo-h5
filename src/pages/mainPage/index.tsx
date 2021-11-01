import React from 'react'
/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'
import FocusOnCom from 'components/FocusOn'
import SwiperTestImg from 'assets/images/swiper-test.png'

import 'swiper/css'
import 'swiper/css/pagination'
import './index.less'

SwiperCore.use([Pagination])

const Index = () => {
  console.log('mainPage')
  return (
    <div className="mainPageContainer">
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
          <img src={SwiperTestImg} className="swiperContent" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={SwiperTestImg} className="swiperContent" />
        </SwiperSlide>
      </Swiper>
      <FocusOnCom />
    </div>
  )
}

export default Index
