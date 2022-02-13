import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { connect } from 'react-redux'
import * as clipboard from 'clipboard-polyfill/text'

import SlideDelete from 'components/SlideDelete'
import PersonalMenu from 'components/PersonalMenu'
import { notify } from '@tgu/toast'
import Tag from 'components/Tag'
import FocusOn from 'components/FocusOn'
import EmptyList from 'components/EmptyList'
import EmptyBottom from 'components/EmptyBottom'
import { changeCollectStatus } from 'apis/detailPageInfo'

import { getPxCurr } from 'utils/index'
import SwiperTestImg from 'assets/images/swiper-test.png'
import heart from 'assets/images/heart.png'
import earphone from 'assets/images/earphone-icon.png'
import contactQrcode from 'assets/images/contact-qrcode.png'

import './index.scss'
import 'swiper/css'

const distance = getPxCurr(196)
let mySwiper = null

const Index = ({ getFavoritesList, getListenList, favoritesList, listenList, history, menuIndex, setMenuIndex }) => {
  const [currIndex, setCurrIndex] = useState(0)
  const [showCouponPanel, setShowCouponPanel] = useState(false)

  // @董帅
  const [userInfo, setUserInfo] = useState<{ avatar: string; nickName: string; gender: number }>({
    avatar: '',
    nickName: '',
    gender: 0,
  })

  useEffect(() => {
    fetchData(menuIndex)
    // @董帅
    getCurrentUserInfo()
  }, [])

  // @董帅
  const getCurrentUserInfo = async () => {
    const result = localStorage.getItem('userInfo')

    setUserInfo(JSON.parse(result))
  }

  const showDeleteIcon = (index) => {
    console.log('出现delete icon')
  }

  const dragStartHandle = (index) => {
    setCurrIndex(index)
  }

  const clickMenuHandle = (index) => () => {
    setMenuIndex(index)
    mySwiper.slideTo(index)
    fetchData(index)
  }

  function fetchData(index) {
    switch (index) {
      case 0:
        break
      case 1:
        getFavoritesList()
        break
      case 2:
        getListenList()
        break
      case 3:
        break
      default:
        console.log('menu default')
    }
  }

  const clipboardHandle = (text) => () => {
    clipboard.writeText(text).then(
      () => {
        notify('复制成功!')
      },
      () => {
        notify('复制失败!')
      },
    )
  }
  const goToDetailInfoPage = (id) => {
    history.push(`/detailInfoPage/${id}`)
  }

  const collectDeleteHandle = (id) => async () => {
    const res = await changeCollectStatus(id)
    if (!res.res.state) {
      getFavoritesList()
    }
  }

  const clickCouponHandle = () => {
    console.log(showCouponPanel)
    setShowCouponPanel(!showCouponPanel)
  }

  return (
    <div className="personalCenterContainer">
      <div className="userInfoContainer">
        <div className="userInfo">
          <img src={userInfo.avatar} alt="头像" className="avater" />
          <span className="name">{userInfo.nickName}</span>
          <div
            className={`couponContainer ${showCouponPanel ? 'couponContainerActive' : ''}`}
            onClick={clickCouponHandle}
          >
            {showCouponPanel ? '收起' : '查看兑换券'}
          </div>
        </div>
        {showCouponPanel && (
          <div className="couponPanel">
            <div className="couponContent">
              <div className="coupon">
                <p className="title">星际通行券</p>
                <p className="time">有效期至 2022.3.20</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <PersonalMenu menuIndex={menuIndex} clickMenuHandle={clickMenuHandle} />
      <Swiper
        className="mySwiper"
        onSwiper={(swiper) => {
          mySwiper = swiper
        }}
        initialSlide={menuIndex}
        allowTouchMove={false}
      >
        {/* 订单列表 */}
        <SwiperSlide>
          <div className="orderContainer">
            <div className="order">
              <div className="orderInfo">
                <div className="imgContainer">
                  <div className="btn">已购买</div>
                  <img src={SwiperTestImg} alt="订单图片" />
                </div>
                <div className="desc">沪港银行历史展览馆丨认识货币与近代中国认识货币与近代中国</div>
                <div className="priceContainer">
                  <div className="pricePintuan">
                    <div className="btnPintuan">拼团价</div>
                    <span>￥</span>35
                  </div>
                  <div className="priceOriginal">
                    <span>￥</span>
                    <span className="priceNum">120</span>
                  </div>
                </div>
              </div>
              <div className="orderDetail">
                <div className="orderDetailInfo">
                  <p>订单编号：D8888 8888 8888</p>
                  <p>创建时间：2021-10-10 16:45</p>
                </div>
                <div className="btn" onClick={clipboardHandle('hahaha')}>
                  一键复制
                </div>
              </div>
            </div>
            <div className="order orderInactive">
              <div className="orderInfo">
                <div className="imgContainer">
                  <div className="btn">订单关闭</div>
                  <img src={SwiperTestImg} alt="订单图片" />
                </div>
                <div className="desc">沪港银行历史展览馆丨认识货币与近代中国认识货币与近代中国</div>
                <div className="priceContainer">
                  <div className="price">
                    <span>￥</span>120
                  </div>
                </div>
              </div>
              <div className="orderDetail">
                <div className="orderDetailInfo">
                  <p>订单编号：D8888 8888 8888</p>
                  <p>创建时间：2021-10-10 16:45</p>
                </div>
                <div className="btn">一键复制</div>
              </div>
            </div>
            <EmptyBottom />
          </div>
        </SwiperSlide>

        {/* 收藏列表 */}
        <SwiperSlide>
          <div className="collectContainer">
            {favoritesList.length > 0 ? (
              <>
                <div className="tips">根据收藏时间&nbsp;从最近到最早</div>
                <div className="collectList">
                  {favoritesList.map((item, index) => (
                    <div key={item.mainClassId} className="collectItem">
                      <SlideDelete
                        onEnd={() => showDeleteIcon(index)}
                        reset={currIndex !== index}
                        index={index}
                        onMyDragStar={dragStartHandle}
                        offsetWidth={distance}
                        criticalWidth={distance / 2}
                        className="collectContent"
                      >
                        <div className="content" onClick={() => goToDetailInfoPage(item.mainClassId)}>
                          <img src={item.scrollImage} className="coverImg" />
                          <div className="centerContainer">
                            <div className="textContainer">{item.desc}</div>
                            <div className="tagList">
                              {item.tags.slice(0, 3).map((tag) => (
                                <Tag text={tag} className="tag" key={tag} />
                              ))}
                            </div>
                            <p className="title">{item.title}</p>
                          </div>

                          <div className="placeContainer">
                            <img src={heart} />
                            <p>{item.city}</p>
                          </div>
                        </div>
                      </SlideDelete>
                      <div className="deleteIcon" onClick={collectDeleteHandle(item.mainClassId)}>
                        删除
                      </div>
                    </div>
                  ))}
                  <EmptyBottom />
                </div>
              </>
            ) : (
              <EmptyList text="你暂时还没有收藏" />
            )}
          </div>
        </SwiperSlide>

        {/* 收听列表 */}
        <SwiperSlide>
          <div className="historyContainer">
            <div className="tips">根据收听时间&nbsp;从最近到最早</div>
            <div className="historyList">
              {listenList.map((item, index) => {
                if (index % 2 === 1) return
                return (
                  <div className="historyListRow" key={item.mainClassId}>
                    <div className="historyItem" onClick={() => goToDetailInfoPage(item.mainClassId)}>
                      <img src={item.scrollImage} className="itemImg" />
                      <div className="placeContainer">
                        <img src={earphone} />
                        {index === 0 ? item.title.substring(0, 5) : item.title}
                        {index === 0 && <div className="recentListen">最近听过</div>}
                      </div>
                      <div className="desc">{item.desc}</div>
                    </div>
                    {listenList[index + 1] && (
                      <div
                        className="historyItem"
                        onClick={() => goToDetailInfoPage(listenList[index + 1].mainClassId)}
                      >
                        <img src={listenList[index + 1].scrollImage} className="itemImg" />
                        <div className="placeContainer">
                          <img src={earphone} />
                          {listenList[index + 1].title}
                        </div>
                        <div className="desc">{listenList[index + 1].desc}</div>
                      </div>
                    )}
                  </div>
                )
              })}
              <EmptyBottom />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="contactContainer">
            <div className="qrcodeContainer">
              <div className="qrcodeItem">
                <p className="title">订单售后</p>
                <img src={contactQrcode} className="qrcode" alt="二维码图片" />
                <p className="contactTips">扫描添加企业微信</p>
              </div>
              <div className="qrcodeItem">
                <p className="title">商务合作</p>
                <img src={contactQrcode} className="qrcode" alt="二维码图片" />
                <p className="contactTips">扫描添加企业微信</p>
              </div>
            </div>
            <p className="contactNumber recommendContainer">
              <br />
              意见反馈 <br />
              <br />
              请在“爱走星球”公众号的对话框中以文字或语音输入您的意见和反馈。 您的意见对我们非常重要！
              <br />
              <br />
            </p>
            <FocusOn showCloseIcon={false} />
            <EmptyBottom />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

const mapState = ({ personalCenter: { favoritesList, listenList, menuIndex } }) => ({
  favoritesList,
  listenList,
  menuIndex,
})

const mapDispatch = ({ personalCenter: { getFavoritesList, getListenList, setMenuIndex } }) => ({
  getFavoritesList,
  getListenList,
  setMenuIndex,
})

export default connect(mapState, mapDispatch)(Index)
