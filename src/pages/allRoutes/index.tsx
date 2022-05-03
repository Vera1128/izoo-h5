import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'

import AllRouteItem from 'components/AllRouteItem'
import TopSearch from 'components/Search'
import EmptyBottom from 'components/EmptyBottom'
import EmptyList from 'components/EmptyList'
import SwitchThemeIcon from 'assets/images/switch-theme.png'
import SwitchCityIcon from 'assets/images/switch-city.png'
import RoutesListEmpty from 'assets/images/routes-list-empty.png'

import 'swiper/css'
import './index.scss'

let mySwiper = null

const Index = ({
  history,
  theme,
  setTheme,
  typesArr,
  listArr,
  citySelectedId,
  setCitySelectedId,
  getTypeList,
  getTypeData,
  setShowRightButton,
  showEmptyListImg,
}) => {
  useEffect(() => {
    if (theme) {
      getTypeList(theme)
    }
    setShowRightButton(true)
  }, [])
  useEffect(() => {
    if (mySwiper) {
      mySwiper.slideTo(citySelectedId)
    }
  }, [citySelectedId])
  const cityClickHandle = (id, index) => () => {
    setCitySelectedId(index)
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
    setCitySelectedId(0)
    getTypeList(themeNew)
  }

  const swiperChange = (index) => {
    setCitySelectedId(index)
    const typeItem = typesArr[index]
    const cityDom = document.getElementById(`cityItem-${typeItem}`)
    cityDom.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    if (!listArr[typeItem] || listArr[typeItem].length < 1) {
      getTypeData({
        type: theme,
        value: typeItem,
      })
    }
  }

  console.log('***')
  console.log(listArr)
  console.log(citySelectedId)

  return (
    <div className="allRoutesContainer">
      <TopSearch
        rightButton={
          <div className="swicthIcon" onClick={switchThemeClickHandle}>
            <p>{theme === 'city' ? '查看主题' : '查看城市'}</p>
            <img src={theme === 'city' ? SwitchThemeIcon : SwitchCityIcon} />
          </div>
        }
      />
      <div className="cityContainer">
        {typesArr.map(
          (type, index) =>
            type && (
              <div className="cityItem" key={type} onClick={cityClickHandle(type, index)} id={`cityItem-${type}`}>
                <div className="cityName">{type}</div>
                <div className={`cityNormal ${citySelectedId === index ? 'citySelected' : ''}`} />
              </div>
            ),
        )}
      </div>
      <div className="line" />
      <div className="allRoutesListContainer">
        <Swiper
          slidesPerView="auto"
          className="mySwiper"
          onSwiper={(swiper) => {
            mySwiper = swiper
            console.log('swiper 初始化')
          }}
          initialSlide={citySelectedId}
          onSlideChange={(swiper) => {
            swiperChange(swiper.activeIndex)
          }}
        >
          {typesArr.map(
            (city) =>
              city && (
                <SwiperSlide key={city.id}>
                  <div className="allRoutesList">
                    {listArr[city]?.length > 0 ? (
                      <>
                        {listArr[city].map((item) => (
                          <AllRouteItem
                            data={item}
                            key={item.mainClassId}
                            onClick={() => {
                              history.push(`/detailInfoPage/${item.mainClassId}`)
                            }}
                          />
                        ))}
                        <EmptyBottom />
                      </>
                    ) : (
                      <EmptyList>
                        {showEmptyListImg ? (
                          <img src={RoutesListEmpty} className="empty-list-img" />
                        ) : (
                          <>正在搜索中，请稍后</>
                        )}
                      </EmptyList>
                    )}
                  </div>
                </SwiperSlide>
              ),
          )}
        </Swiper>
      </div>
    </div>
  )
}

const mapState = ({ allRoutes: { typesArr, citySelectedId, listArr, theme, showEmptyListImg } }) => ({
  typesArr,
  listArr,
  citySelectedId,
  theme,
  showEmptyListImg,
})

const mapDispatch = ({
  allRoutes: { setCitySelectedId, getTypeList, getTypeData, setTheme },
  search: { setShowRightButton },
}) => ({
  setCitySelectedId,
  getTypeList,
  getTypeData,
  setTheme,
  setShowRightButton,
})

export default connect(mapState, mapDispatch)(Index)
