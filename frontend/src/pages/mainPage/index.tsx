import React, { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import { connect } from 'react-redux'
import wx from 'weixin-js-sdk'

import { debounce } from 'src/utils'

import FocusOnCom from 'components/FocusOn'
import NearbyList from 'components/NearbyList'
import ThemeList from 'components/ThemeList'
import CityList from 'components/CityList'
import RecommendList from 'components/RecommendList'
import TopSearch from 'components/Search'
import EmptyBottom from 'components/EmptyBottom'

import 'swiper/css'
import 'swiper/css/pagination'
import './index.less'
import statUtil from 'src/utils/statUtil'

SwiperCore.use([Pagination, Autoplay])

const Index = ({
  history,
  offsetY,
  cityList,
  setOffsetY,
  getCityData,
  populerList,
  scrollList,
  themeList,
  nearbyList,
  getPopulerData,
  getScrollData,
  getTagsData,
  getNearbyData,
  setSelectedId,
  setTheme,
  setCurrentThemeName,
  getSignature,
}) => {
  const pageRef = useRef(null)
  useEffect(() => {
    getSignature(window.location.href.split('#')[0]).then(() => {
      wx.ready(() => {
        console.log('wx config ready')
        wx.getLocation({
          success: function (res) {
            const { latitude, longitude } = res
            getNearbyData({
              longitude: `${longitude}`,
              latitude: `${latitude}`,
            })
          },
          error: function (res) {
            console.log('getLocation error')
            console.log(res)
          },
        })
      })
      wx.error((res: any) => {
        console.log('mainPage wx config error')
        console.log(res)
      })
    })
    getCityData()
    getPopulerData()
    getScrollData()
    getTagsData()
  }, [])
  useEffect(() => {
    pageRef.current.scrollTop = offsetY
  }, [pageRef.current])

  const scrollHandle = (e) => {
    setOffsetY(e.target.scrollTop)
  }

  const goToDetailInfoPage = (mainClassId) => () => {
    history.push(`/detailInfoPage/${mainClassId}`)
  }
  const clickMoreHandle = () => {
    setSelectedId('allRoutes')
    history.replace('/index/allRoutes')
  }
  const clickCityMoreHandle = () => {
    setSelectedId('allRoutes')
    setTheme('city')
    setCurrentThemeName('')
    history.replace('/index/allRoutes')
  }
  const themeClickHandle = (theme) => () => {
    setSelectedId('allRoutes')
    history.replace('/index/allRoutes')
    setTheme('tag')
    setCurrentThemeName(theme)
    statUtil.report('文化行走-行走主题-点击', { tag: theme })
  }
  const cityClickHandle = (theme) => () => {
    setSelectedId('allRoutes')
    history.replace('/index/allRoutes')
    setTheme('city')
    setCurrentThemeName(theme)
  }
  return (
    <div className="mainPageContainer" ref={pageRef} onScroll={debounce(scrollHandle, 500)}>
      <TopSearch itemClick={goToDetailInfoPage} />
      <Swiper
        slidesPerView="auto"
        className="mySwiper"
        watchSlidesProgress={true}
        pagination={{
          clickable: false,
        }}
        onSwiper={() => {}}
        initialSlide={0}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {scrollList.map((item) => (
          <SwiperSlide key={item.mainClassId}>
            <img
              src={item.scrollImg}
              className="swiperContent"
              alt="轮播图"
              onClick={() => {
                goToDetailInfoPage(item.mainClassId)
                statUtil.report('文化行走-轮播-点击', { mainClassId: item.mainClassId })
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <FocusOnCom />
      <NearbyList
        list={nearbyList}
        itemClick={(mainClassId) => () => {
          statUtil.report('文化行走-离你不远-点击', { mainClassId: mainClassId })
          goToDetailInfoPage(mainClassId)
        }}
        clickMoreHandle={clickMoreHandle}
      />
      <ThemeList list={themeList} itemClick={themeClickHandle} />
      {/* <CityList list={cityList} itemClick={cityClickHandle} clickMoreHandle={clickCityMoreHandle} /> */}
      <RecommendList
        list={populerList}
        itemClick={(mainClassId) => () => {
          statUtil.report('文化行走-热门推荐-点击', { mainClassId: mainClassId })
          goToDetailInfoPage(mainClassId)
        }}
      />
      <EmptyBottom color="#666699" />
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
  main: { setOffsetY, getCityData, getPopulerData, getScrollData, getTagsData, getNearbyData },
  base: { setSelectedId, getSignature },
  allRoutes: { setTheme, setCurrentThemeName },
}) => ({
  setOffsetY,
  getCityData,
  getPopulerData,
  getScrollData,
  getTagsData,
  getNearbyData,
  setSelectedId,
  setTheme,
  setCurrentThemeName,
  getSignature,
})

export default connect(mapState, mapDispatch)(Index)
