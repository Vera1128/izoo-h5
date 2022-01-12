import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import { notify } from '@tgu/toast'
import sf from 'seconds-formater'

import FocusOnCom from 'components/FocusOn'
import EmptyBottom from 'components/EmptyBottom'
import Mask from 'components/Mask'
import Tag from 'components/Tag'
import BackIcon from 'components/BackIcon'
import { AudioGlobal } from 'src/modules/audio'
import { changeCollectStatus } from 'apis/detailPageInfo'
import Button from 'components/Button'
import { throttle } from 'src/utils'

import EventManager from 'src/modules/eventManager'
import { EventType } from 'src/modules/EventType'

import HomeImg from 'assets/images/home.png'
import ShareImg from 'assets/images/share.png'
import HeartNormalImg from 'assets/images/heart-normal.png'
import HeartCollectImg from 'assets/images/heart.png'
import DetailPageShareImg from 'assets/images/detail-page-share.png'
import LocationIcon from 'assets/images/location-icon.png'
import PriceIcon from 'assets/images/price-icon.png'
import TimeIcon from 'assets/images/time-icon.png'
import TagIcon from 'assets/images/tag-icon.png'
import playIcon from 'assets/images/play-icon-bold.png'
import pauseIcon from 'assets/images/pause-icon.png'
import audioContinueIcon from 'assets/images/music-flow-icon.png'

import 'swiper/css'
import 'swiper/css/pagination'
import './index.scss'

SwiperCore.use([Pagination, Autoplay])

const Index = ({ history, match, detailInfo, getDetailInfo, setCollectStatus, setDetailInfo }) => {
  const [showShareMask, setShowShareMask] = useState(false)
  const [selectMenu, setSelectMenu] = useState(1)
  const [playProgress, setPlayProgress] = useState({})
  const {
    params: { id },
  } = match
  const { catalogList, info, isCollect, isPayment } = detailInfo
  useEffect(() => {
    getDetailInfo(id)
    let listener = null
    EventManager.on(
      EventType.AUDIO_PROGRESS_UPDATE,
      (listener = throttle((progress) => {
        setPlayProgress(progress)
        console.log(progress)
      }, 1000)),
    )
    return () => {
      EventManager.off(EventType.AUDIO_PROGRESS_UPDATE, listener)
    }
  }, [])
  useEffect(() => {
    if (catalogList?.length > 0) {
      const audioList = []
      catalogList.forEach((item) => {
        if (item.isAudition) audioList.push(item)
      })
      AudioGlobal.getInstance().audiosInit(audioList)
    }
  }, [detailInfo])
  const clickPlayAudio = (id) => {
    AudioGlobal.getInstance().audioPlay(id)
  }
  const backToMainPage = () => {
    history.go(-1)
    setDetailInfo({})
  }
  const changeCollectStatusHandle = async () => {
    const res = await changeCollectStatus(id)
    setCollectStatus(res.res.state)
    if (res.res.state) notify('收藏成功', 1000)
    else notify('已取消收藏', 1000)
  }
  const showBottomBtn = () => {
    // 是否已经支付
    if (isPayment)
      return (
        <Button
          className="freeBtn"
          onClick={() => history.push({ pathname: '/routeListPage', query: { catalogList } })}
        >
          <p className="largeText">进入收听</p>
          <p className="smallText">已购买</p>
        </Button>
      )
    // 是否免费
    if (!info?.isCharge) {
      return (
        <Button
          className="freeBtn"
          onClick={() => history.push({ pathname: '/routeListPage', query: { catalogList } })}
        >
          <p className="largeText">免费收听</p>
        </Button>
      )
    }
    // 是否只单独购买
    if (!info?.avgAmount)
      return (
        <Button className="freeBtn">
          <p className="largeText">立即购买</p>
          <p className="smallText">￥ {info?.amount}</p>
        </Button>
      )
    // 拼团+单独购买
    return (
      <div className="buyContainer">
        <div className="buyItem" onClick={() => history.push(`/order/single?routeId=${id}`)}>
          <p>直接购买</p>
          <p>￥ {info?.amount}</p>
        </div>
        <div className="buyItem" onClick={() => history.push(`/order/group?routeId=${id}`)}>
          <p>2人拼团</p>
          <p>￥ {info?.avgAmount}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="detailInfoPage">
      <BackIcon clickHandle={backToMainPage} />
      {/* <img src={audioContinueIcon} className="playContinue" /> */}
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
        {info?.scrollImages.length > 0 &&
          info?.scrollImages.map((item) => (
            <SwiperSlide key={item}>
              <img src={item} className="swiperContent" alt="轮播图" />
            </SwiperSlide>
          ))}
      </Swiper>
      <FocusOnCom />
      <div className="detailInfoContent">
        <div className="detailInfoMenu">
          <div className={`menuItem ${selectMenu === 1 ? 'menuItemSelected' : ''}`} onClick={() => setSelectMenu(1)}>
            景点攻略
            {selectMenu === 1 && <div className="line" />}
          </div>
          <div className={`menuItem ${selectMenu === 2 ? 'menuItemSelected' : ''}`} onClick={() => setSelectMenu(2)}>
            导览简介
            {selectMenu === 2 && <div className="line" />}
          </div>
        </div>
        <div className="routeInfoContainer">
          <div className="routeInfoItem">
            <img src={LocationIcon} className="locationIcon" />
            <p>{info?.address}</p>
          </div>
          <div className="routeInfoItem">
            <img src={TimeIcon} className="timeIcon" />
            <p>{info?.time}</p>
          </div>
          <div className="routeInfoItem">
            <img src={PriceIcon} className="priceIcon" />
            <p>{info?.tickets}</p>
          </div>
          <div className="routeInfoItem">
            <img src={TagIcon} className="tagIcon" />
            <div className="tagList">
              {info?.tags.map((tag) => (
                <Tag text={tag} className="tag" key={tag} />
              ))}
            </div>
          </div>
        </div>
        <div onClick={clickPlayAudio}>点击</div>
        <p dangerouslySetInnerHTML={{ __html: info?.content }} />
        <div className="routeCatalogList">
          <p>讲解目录</p>
          {catalogList?.map((item, index) => (
            <div className="catalogItemContainer" key={item.subId}>
              <div className="catalogItem">
                {/* hard code */}
                {item.isAudition ? (
                  <>
                    <div className="num numAudition">试听</div>
                    <div className="text textAudition">{item.title}</div>
                    <img
                      src={playProgress[item.subId]?.isPlay ? pauseIcon : playIcon}
                      className="playIcon"
                      onClick={() => clickPlayAudio(item.subId)}
                    />
                  </>
                ) : (
                  <>
                    <div className="num">{`0${index + 1}`.slice(-2)}</div>
                    <div className="text">{item.title}</div>
                  </>
                )}
              </div>
              {item.isAudition && (
                <div className="audioProgress">
                  <span className="currrent">
                    {sf.convert(Math.round(playProgress[item.subId]?.currentTime || 0)).format('MM:SS')}
                  </span>
                  <div className="progressContainer">
                    <div className="progressBar" style={{ width: playProgress[item.subId]?.progress || 0 }} />
                    <div className="progressDot" style={{ left: playProgress[item.subId]?.progress || 0 }} />
                  </div>
                  <span className="duration">{sf.convert(Math.round(item.duration || 0)).format('MM:SS')}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <EmptyBottom color="white" />
      </div>

      <div className="detailPageMenu">
        <div className="menuContainer1" onClick={backToMainPage}>
          <img src={HomeImg} className="homeIcon" />
          <p className="menuText">首页</p>
        </div>
        <div className="menuContainer1 menuContainerMargin" onClick={() => setShowShareMask(true)}>
          <img src={ShareImg} className="shareIcon" />
          <p className="menuText">分享</p>
        </div>
        <div className="menuContainer1 menuContainerMargin" onClick={changeCollectStatusHandle}>
          <img src={isCollect ? HeartCollectImg : HeartNormalImg} className="heartIcon" />
          <p className="menuText">收藏</p>
        </div>
        {showBottomBtn()}
      </div>
      {showShareMask && (
        <Mask onClickHandle={() => setShowShareMask(false)}>
          <img src={DetailPageShareImg} className="shareImg" />
        </Mask>
      )}
    </div>
  )
}

const mapState = ({ detailInfoPage: { detailInfo } }) => ({
  detailInfo,
})

const mapDispatch = ({ detailInfoPage: { getDetailInfo, setCollectStatus, setDetailInfo } }) => ({
  getDetailInfo,
  setCollectStatus,
  setDetailInfo,
})

export default connect(mapState, mapDispatch)(Index)
