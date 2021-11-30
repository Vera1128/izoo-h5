import React, { useRef, useEffect } from 'react'
/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'
import { connect } from 'react-redux'

import { debounce } from 'src/utils'

import FocusOnCom from 'components/FocusOn'
import NearbyList from 'components/NearbyList'
import ThemeList from 'components/ThemeList'
import CityList from 'components/CityList'
import RecommendList from 'components/RecommendList'
import TopSearch from 'components/Search'

import SwiperTestImg from 'assets/images/swiper-test.png'

import 'swiper/css'
import 'swiper/css/pagination'
import './index.less'

SwiperCore.use([Pagination])

const Index = ({
  offsetY,
  cityList,
  setOffsetY,
  getUserInfo,
  getCityData,
  populerList,
  scrollList,
  themeList,
  nearbyList,
  getPopulerData,
  getScrollData,
  getTagsData,
  getNearbyData,
}) => {
  const pageRef = useRef(null)
  useEffect(() => {
    getUserInfo()
    getCityData()
    getPopulerData()
    getScrollData()
    getTagsData()
    getNearbyData({
      longitude: '31.219',
      latitude: '121.62',
    })
  }, [])
  useEffect(() => {
    pageRef.current.scrollTop = offsetY
  }, [pageRef.current])

  const scrollHandle = (e) => {
    setOffsetY(e.target.scrollTop)
  }
  return (
    <div className="mainPageContainer" ref={pageRef} onScroll={debounce(scrollHandle, 500)}>
      <TopSearch />
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
      <NearbyList />
      <ThemeList />
      <CityList list={cityList} />
      <RecommendList />
      <div className="emptyDiv" />
    </div>
  )
}

const mapState = ({ main: { offsetY, cityList, populerList, scrollList, themeList, nearbyList } }) => ({
  offsetY,
  cityList,
  populerList,
  scrollList,
  themeList,
  nearbyList,
})

const mapDispatch = ({
  main: { setOffsetY, getUserInfo, getCityData, getPopulerData, getScrollData, getTagsData, getNearbyData },
}) => ({
  setOffsetY,
  getUserInfo,
  getCityData,
  getPopulerData,
  getScrollData,
  getTagsData,
  getNearbyData,
})

export default connect(mapState, mapDispatch)(Index)
