import React, { useRef, useEffect } from 'react'
/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'
import { connect } from 'react-redux'

import { debounce } from 'src/utils'

import FocusOnCom from 'components/FocusOn'
import NearbyList from 'src/components/NearbyList'
import ThemeList from 'src/components/ThemeList'
import CityList from 'src/components/CityList'
import RecommendList from 'src/components/RecommendList'

import SwiperTestImg from 'assets/images/swiper-test.png'

import 'swiper/css'
import 'swiper/css/pagination'
import './index.less'

SwiperCore.use([Pagination])

const Index = ({ offsetX, setOffsetX }) => {
  const pageRef = useRef(null)
  useEffect(() => {
    pageRef.current.scrollTop = offsetX
  }, [pageRef.current])

  const scrollHandle = (e) => {
    setOffsetX(e.target.scrollTop)
  }
  return (
    <div className="mainPageContainer" ref={pageRef} onScroll={debounce(scrollHandle, 500)}>
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
      <NearbyList />
      <ThemeList />
      <CityList />
      <RecommendList />
      <div className="emptyDiv" />
    </div>
  )
}

const mapState = ({ main: { offsetX } }) => ({
  offsetX,
})

const mapDispatch = ({ main: { setOffsetX } }) => ({
  setOffsetX,
})

export default connect(mapState, mapDispatch)(Index)
