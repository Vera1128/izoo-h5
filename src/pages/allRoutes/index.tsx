import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'

import AllRouteItem from 'components/AllRouteItem'
import TopSearch from 'components/Search'
import EmptyBottom from 'components/EmptyBottom'
import EmptyList from 'components/EmptyList'
import SwitchThemeIcon from 'assets/images/switch-theme.png'
import SwitchCityIcon from 'assets/images/switch-city.png'

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
}) => {
  useEffect(() => {
    getTypeList(theme)
    setShowRightButton(true)
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
    setCitySelectedId(0)
    mySwiper.slideTo(0)
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
                      <EmptyList />
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

const mapState = ({ allRoutes: { typesArr, citySelectedId, listArr, theme } }) => ({
  typesArr,
  listArr,
  citySelectedId,
  theme,
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
