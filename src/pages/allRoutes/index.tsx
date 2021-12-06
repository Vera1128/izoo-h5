import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'

import AllRouteItem from 'components/AllRouteItem'
import TopSearch from 'components/Search'
import EmptyBottom from 'components/EmptyBottom'
import EmptyList from 'components/EmptyList'
import SwitchThemeIcon from 'assets/images/switch-theme.png'

import 'swiper/css'
import './index.scss'

let mySwiper = null

const Index = ({ typesArr, listArr, citySelectedId, setCitySelectedId, getTypeList, getTypeData }) => {
  useEffect(() => {
    getTypeList('city')
  }, [])
  const cityClickHandle = (id, index) => () => {
    setCitySelectedId(index)
    mySwiper.slideTo(index)
    const cityDom = document.getElementById(`cityItem-${id}`)
    cityDom.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
  }
  return (
    <div className="allRoutesContainer">
      <TopSearch
        rightButton={
          <div className="swicthIcon">
            <p>切换主题</p>
            <img src={SwitchThemeIcon} />
          </div>
        }
      />
      <div className="cityContainer">
        {typesArr.map((type, index) => (
          <div className="cityItem" key={type} onClick={cityClickHandle(type, index)} id={`cityItem-${type}`}>
            <div className="cityName">{type}</div>
            <div className={`cityNormal ${citySelectedId === index ? 'citySelected' : ''}`} />
          </div>
        ))}
      </div>
      <div className="line" />
      <div className="allRoutesListContainer">
        <Swiper
          slidesPerView="auto"
          className="mySwiper"
          onSwiper={(swiper) => {
            mySwiper = swiper
          }}
          initialSlide={citySelectedId}
        >
          {typesArr.map((city) => (
            <SwiperSlide key={city.id}>
              {/* <div className="allRoutesList">
                {city.list.length > 0 ? (
                  <>
                    {city.list.map((item) => (
                      <AllRouteItem data={item} key={item.id} />
                    ))}
                    <EmptyBottom />
                  </>
                ) : (
                  <EmptyList />
                )}
              </div> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

const mapState = ({ allRoutes: { typesArr, citySelectedId, listArr } }) => ({
  typesArr,
  listArr,
  citySelectedId,
})

const mapDispatch = ({ allRoutes: { setCitySelectedId, getTypeList, getTypeData } }) => ({
  setCitySelectedId,
  getTypeList,
  getTypeData,
})

export default connect(mapState, mapDispatch)(Index)
