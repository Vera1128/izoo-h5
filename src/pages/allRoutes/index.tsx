import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'

import AllRouteItem from 'components/AllRouteItem'

import 'swiper/css'
import './index.less'

let mySwiper = null

const Index = ({ citiesArr, citySelectedId, setCitySelectedId }) => {
  const cityClickHandle = (id, index) => () => {
    setCitySelectedId(index)
    mySwiper.slideTo(index)
    const cityDom = document.getElementById(`cityItem${id}`)
    cityDom.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
  }
  return (
    <div className="allRoutesContainer">
      <div className="topArea" />
      <div className="cityContainer">
        {citiesArr.map((city, index) => (
          <div className="cityItem" key={city.id} onClick={cityClickHandle(city.id, index)} id={`cityItem${city.id}`}>
            <div className="cityName">{city.name}</div>
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
          {citiesArr.map((city) => (
            <SwiperSlide key={city.id}>
              <div className="allRoutesList">
                {city.list.length > 0 ? (
                  city.list.map((item) => <AllRouteItem data={item} key={item.id} />)
                ) : (
                  <p>空列表</p>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

const mapState = ({ allRoutes: { citiesArr, citySelectedId } }) => ({
  citiesArr,
  citySelectedId,
})

const mapDispatch = ({ allRoutes: { setCitySelectedId } }) => ({
  setCitySelectedId,
})

export default connect(mapState, mapDispatch)(Index)
