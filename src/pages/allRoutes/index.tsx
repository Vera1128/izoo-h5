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
  const [theme, setTheme] = useState('city')
  useEffect(() => {
    getTypeList(theme)
  }, [])
  const cityClickHandle = (id, index) => () => {
    setCitySelectedId(index)
    mySwiper.slideTo(index)
    const cityDom = document.getElementById(`cityItem-${id}`)
    cityDom.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    if (!listArr[id] || listArr[id].length < 1) {
      getTypeData({
        type: theme,
        value: id,
      })
    }
  }
  const switchThemeClickHandle = () => {
    const themeNew = theme === 'city' ? 'tag' : 'city'
    setTheme(themeNew)
    getTypeList(themeNew)
  }
  return (
    <div className="allRoutesContainer">
      <TopSearch
        rightButton={
          <div className="swicthIcon" onClick={switchThemeClickHandle}>
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
              <div className="allRoutesList">
                {listArr[city]?.length > 0 ? (
                  <>
                    {listArr[city].map((item) => (
                      <AllRouteItem data={item} key={item.mainClassId} />
                    ))}
                    <EmptyBottom />
                  </>
                ) : (
                  <EmptyList />
                )}
              </div>
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
