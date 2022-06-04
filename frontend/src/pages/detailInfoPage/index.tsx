import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import { notify } from '@tgu/toast'
import sf from 'seconds-formater'
import wx from 'weixin-js-sdk'

import FocusOnCom from 'components/FocusOn'
import EmptyBottom from 'components/EmptyBottom'
import Mask from 'components/Mask'
import Tag from 'components/Tag'
import BackIcon from 'components/BackIcon'
import Button from 'components/Button'
import CouponPopup from 'components/CouponPopup'
import { changeCollectStatus, listenReport } from 'apis/detailPageInfo'
import { throttle, getPxCurr, getQueryParam } from 'src/utils'

import EventManager from 'src/modules/eventManager'
import { EventType } from 'src/modules/EventType'
import { AudioGlobalDetail } from 'src/modules/audioDetailPage'
import { AudioGlobal } from 'src/modules/audio'

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
import { couponAction } from 'apis/order'
import { getCouponList } from 'apis/personalCenter'

import 'swiper/css'
import 'swiper/css/pagination'
import './index.scss'

const shareConfig = require('src/config/share.json')

SwiperCore.use([Pagination, Autoplay])

let scrollTopDistance = 0

const Index = ({
  history,
  match,
  detailInfo,
  catalogList,
  getCatalogList,
  getDetailInfo,
  setCollectStatus,
  setDetailInfo,
  setBackFromRouteDetail,
  getSignature,
}) => {
  const [showBack, setShowBack] = useState(true)
  const [showShareMask, setShowShareMask] = useState(false)
  const [selectMenu, setSelectMenu] = useState(1)
  const [playProgress, setPlayProgress] = useState({})
  const [isFocusOnClosed, setIsFocusOnClosed] = useState(false)
  const [showCouponUse, setShowCouponUse] = useState(false)
  const {
    params: { id },
  } = match
  const { info, isCollect, isPayment, duration, totals, groupId } = detailInfo
  const detailInfoContainerRef = useRef(null)
  const detailInfoContentRef = useRef(null)
  const detailInfoPageRef = useRef(null)
  useEffect(() => {
    if (history.length < 2) {
      setShowBack(false)
    }
    console.log('document.referrer', document.referrer)
    console.log('from', getQueryParam('from'))
    console.log(history.length)
    // 收听内容信息上报
    listenReport(id, '', 0)
    getDetailInfo(id)
    getCatalogList(id)

    let listener1 = null
    EventManager.on(
      EventType.AUDIO_PROGRESS_UPDATE_DETAIL,
      (listener1 = throttle((progress) => {
        setPlayProgress(progress)
      }, 1000)),
    )
    return () => {
      EventManager.off(EventType.AUDIO_PROGRESS_UPDATE_DETAIL, listener1)
    }
  }, [])
  useEffect(() => {
    if (catalogList?.length > 0) {
      const audioList = []
      catalogList.forEach((item) => {
        if (item.isAudition) audioList.push(item)
      })
      AudioGlobalDetail.getInstance().audiosInit(audioList)
    }
    if (detailInfo && JSON.stringify(detailInfo) !== '{}') {
      getSignature(window.location.href.split('#')[0]).then(() => {
        wx.ready(() => {
          console.log('购买页wx config ready')
          const shareInfo = {
            title: `${info.title}亲子行走语音导览`,
            desc: info.desc || '',
            link: window.location.href,
            imgUrl: shareConfig.icon, // 分享图标
            fail: (res) => {
              console.log('设置失败信息', res)
            },
            success: (res) => {
              console.log('设置成功信息', res)
            },
          }
          wx.updateAppMessageShareData(shareInfo)
          wx.updateTimelineShareData(shareInfo)
        })
        wx.error((res: any) => {
          console.log('购买页wx config error')
          console.log(res)
        })
      })
    }
  }, [detailInfo])

  useEffect(() => {
    if (detailInfoContainerRef?.current && detailInfoContentRef?.current) {
      // 正文到顶部的距离 = 自身父级的offsetTop +  自身的offsetTop + 切换tab的高度
      const distance = detailInfoContentRef.current.offsetTop + detailInfoContainerRef.current.offsetTop + getPxCurr(80)
      scrollTopDistance = distance
    }
  }, [detailInfo, isFocusOnClosed])

  const audioPlay = (id: string) => {
    AudioGlobal.getInstance().audioStop()
    AudioGlobalDetail.getInstance().audioPlay(id)
  }

  const audioStop = () => {
    AudioGlobalDetail.getInstance().audioStop()
  }

  const clickPlayAudio = (subId) => {
    audioPlay(subId)
  }

  const backToMainPage = () => {
    history.go(-1)
  }
  const goToMainPage = () => {
    console.log(history)
    console.log(history.length)
    audioStop()
    history.replace('/index/mainPage')
    setDetailInfo({})
  }
  const changeCollectStatusHandle = async () => {
    const res = await changeCollectStatus(id)
    setCollectStatus(res.res.state)
    if (res.res.state) notify('收藏成功', 1000)
    else notify('已取消收藏', 1000)
  }
  const goToRouteListHandle = () => {
    audioStop()
    setBackFromRouteDetail(false)
    history.push({ pathname: `/routeListPage/${id}` })
  }

  const buySingleClickHandle = async () => {
    // 如果有可使用的优惠券 就弹出优惠券使用弹框
    const res = await getCouponList()
    if (res) {
      const {
        res: { list },
      } = res
      if (
        list.filter(
          (coupon: any) =>
            coupon.state !== 'used' && new Date(coupon.eTime.replaceAll('-', '/')).getTime() > new Date().getTime(),
        ).length > 0
      ) {
        setShowCouponUse(true)
        return
      }
    }
    // 没有的话 就直接跳到购买页面
    goToSingleBuy()
  }
  const goToSingleBuy = () => {
    history.push(`/order/single?routeId=${id}`)
  }
  const showBottomBtn = () => {
    console.log('isPayment', isPayment)
    // 是否是拼团中
    if (isPayment === 'wait') {
      return (
        <div className="buyContainer">
          <div className="buyItem" onClick={buySingleClickHandle}>
            <p className="topText">直接购买</p>
            <p>￥ {info?.amount}</p>
          </div>
          <div className="buyItem" onClick={() => history.push(`/group/${id}/${groupId}`)}>
            <p className="topText">拼团中</p>
            <p>￥ {info?.avgAmount}</p>
          </div>
        </div>
      )
    }
    // 是否已经支付
    if (isPayment === 'true')
      return (
        <Button className="freeBtn" onClick={goToRouteListHandle}>
          <p className="largeText">进入收听</p>
          <p className="smallText">已购买</p>
        </Button>
      )
    // 是否免费
    if (!info?.isCharge) {
      return (
        <Button className="freeBtn" onClick={goToRouteListHandle}>
          <p className="largeText">免费收听</p>
        </Button>
      )
    }
    // 是否只单独购买
    if (!info?.avgAmount)
      return (
        <Button className="freeBtn" onClick={buySingleClickHandle}>
          <p className="largeText">立即购买</p>
          <p className="smallText">￥ {info?.amount}</p>
        </Button>
      )
    // 拼团+单独购买
    return (
      <div className="buyContainer">
        {/* <div
          className="buyItem"
          onClick={async () => {
            // @杨杨, 使用[个人中心]跳转过来携带的couponId
            await couponEvent(id)
          }}
        >
          <p>使用优惠券</p>
        </div> */}
        <div className="buyItem" onClick={buySingleClickHandle}>
          <p className="topText">直接购买</p>
          <p>￥ {info?.amount}</p>
        </div>
        <div className="buyItem" onClick={() => history.push(`/order/group?routeId=${id}`)}>
          <p className="topText">{info?.nums}人拼团</p>
          <p>￥ {info?.avgAmount}</p>
        </div>
      </div>
    )
  }

  const setInfoContentIntoView = () => {
    const dom = detailInfoPageRef.current
    const timer = setInterval(() => {
      if (dom.scrollTop < scrollTopDistance - 10 && dom.scrollHeight - dom.scrollTop > window.innerHeight) {
        dom.scrollTop += 10
      } else {
        clearInterval(timer)
      }
    }, 1)
  }

  // 任性付费买
  const couponRightClickHandle = () => {
    goToSingleBuy()
  }

  // 使用兑换券
  const couponLeftClickHandle = () => {
    couponEvent(id)
  }
  // 使用兑换券
  const couponEvent = async (mainClassId: string) => {
    const res = await couponAction({ mainClassId })
    if (res.isSucc) {
      notify('兑换成功', 1000)
      getDetailInfo(id)
    } else {
      notify(res.err.message, 1000)
    }
    setShowCouponUse(false)
  }

  return (
    <>
      <div className="detailInfoPage" ref={detailInfoPageRef}>
        {showBack && <BackIcon clickHandle={backToMainPage} />}
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
        <FocusOnCom closeCallback={() => setIsFocusOnClosed(true)} />
        <div className="detailInfoContent" ref={detailInfoContentRef}>
          <div className="detailInfoMenu">
            <div className={`menuItem ${selectMenu === 1 ? 'menuItemSelected' : ''}`} onClick={() => setSelectMenu(1)}>
              景点攻略
              {selectMenu === 1 && <div className="line" />}
            </div>
            <div
              className={`menuItem ${selectMenu === 2 ? 'menuItemSelected' : ''}`}
              onClick={() => {
                setSelectMenu(2)
                setInfoContentIntoView()
              }}
            >
              导览简介
              {selectMenu === 2 && <div className="line" />}
            </div>
          </div>
          <div className="detailInfoBottomContainer">
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
            <p
              dangerouslySetInnerHTML={{ __html: info?.content }}
              className="routeDetailContent"
              ref={detailInfoContainerRef}
            />
            <div className="routeCatalogList">
              <p>讲解目录</p>
              {catalogList?.map((item, index) => (
                <div className="catalogItemContainer" key={item.subId}>
                  <div className="catalogItem">
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
              <div className="bottomSum">
                时长{Math.round(duration / 60)}分钟&nbsp;&nbsp;&nbsp;&nbsp;讲解{totals}条
              </div>
            </div>
            <EmptyBottom color="white" />
          </div>
        </div>
      </div>
      <div className="detailPageMenuBottom">
        <div className="detailPageMenu">
          <div className="menuContainer1" onClick={goToMainPage}>
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
        <div className="emptyMenuBottom" />
      </div>

      {showShareMask && (
        <Mask onClickHandle={() => setShowShareMask(false)}>
          <img src={DetailPageShareImg} className="shareImg" />
        </Mask>
      )}
      {showCouponUse && (
        <CouponPopup
          onLeftClickHandle={couponLeftClickHandle}
          onRightClickHandle={couponRightClickHandle}
          onClose={() => {
            setShowCouponUse(false)
          }}
        />
      )}
    </>
  )
}

const mapState = ({ detailInfoPage: { detailInfo, catalogList } }) => ({
  detailInfo,
  catalogList,
})

const mapDispatch = ({
  detailInfoPage: { getDetailInfo, getCatalogList, setCollectStatus, setDetailInfo, setBackFromRouteDetail },
  base: { getSignature },
}) => ({
  getDetailInfo,
  getCatalogList,
  setCollectStatus,
  setDetailInfo,
  setBackFromRouteDetail,
  getSignature,
})

export default connect(mapState, mapDispatch)(Index)
