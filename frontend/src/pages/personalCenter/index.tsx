import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { connect } from 'react-redux'
import * as clipboard from 'clipboard-polyfill/text'

import SlideDelete from 'components/SlideDelete'
import PersonalMenu from 'components/PersonalMenu'
import { notify } from '@tgu/toast'
import Tag from 'components/Tag'
import EmptyList from 'components/EmptyList'
import EmptyBottom from 'components/EmptyBottom'
import { changeCollectStatus } from 'apis/detailPageInfo'

import { getPxCurr } from 'utils/index'
import { timeStampToDate } from 'utils/tools'
import heart from 'assets/images/heart.png'
import earphone from 'assets/images/earphone-icon.png'
import contactQrcode from 'assets/images/contact-qrcode.png'
import contactWechat from 'assets/images/contact-wechat.png'
import planetIcon from 'assets/images/coupon-bg.png'

import './index.scss'
import 'swiper/css'

const orderState = {
  success: '已购买',
  wait: '拼团中',
  fail: '订单关闭',
}

const distance = getPxCurr(196)
let mySwiper = null

const Index = ({
  getOrderList,
  getFavoritesList,
  getListenList,
  getCouponList,
  favoritesList,
  listenList,
  history,
  menuIndex,
  setMenuIndex,
  orderList,
  couponList,
}) => {
  const [currIndex, setCurrIndex] = useState(0)
  const [showCouponPanel, setShowCouponPanel] = useState(false)
  const [showCouponDetail, setShowCouponDetail] = useState(false)
  const [couponDetail, setCouponDetail] = useState({
    couponId: '',
    eTime: '',
    name: '',
    sTime: '',
  })
  const [showSearchLoading, setShowSearchLoading] = useState([false, false, false])
  // @董帅
  const [userInfo, setUserInfo] = useState<{ avatar: string; nickName: string; gender: number; userId: number }>({
    avatar: '',
    nickName: '',
    gender: 0,
    userId: 0,
  })

  useEffect(() => {
    fetchData(menuIndex)
    getCouponList()
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

  async function fetchData(index) {
    switch (index) {
      case 0:
        setShowSearchLoading([true, showSearchLoading[1], showSearchLoading[2]])
        await getOrderList()
        setShowSearchLoading([false, showSearchLoading[1], showSearchLoading[2]])
        break
      case 1:
        setShowSearchLoading([showSearchLoading[0], true, showSearchLoading[2]])
        await getFavoritesList()
        setShowSearchLoading([showSearchLoading[1], false, showSearchLoading[2]])
        break
      case 2:
        setShowSearchLoading([showSearchLoading[0], showSearchLoading[1], true])
        await getListenList()
        setShowSearchLoading([showSearchLoading[0], showSearchLoading[1], false])
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

  const orderClickHandle = (status, id, groupId) => () => {
    if (status === 'fail') return
    if (status === 'wait') {
      goToGroupPage(id, groupId)
      return
    }
    goToDetailInfoPage(id)
  }

  const goToGroupPage = (id, groupId) => {
    history.push(`/group/${id}/${groupId}`)
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

  const closeCouponClick = () => {
    if (showCouponDetail) setShowCouponDetail(false)
    else setShowCouponPanel(false)
  }

  const handleCouponClick = (couponInfo) => () => {
    setCouponDetail(couponInfo)
    setShowCouponDetail(true)
  }

  return (
    <div className="personalCenterContainer">
      <div className="userInfoContainer">
        <div className="userInfo">
          <img src={userInfo.avatar} alt="头像" className="avater" />
          <div className="name">
            {userInfo.nickName}
            <br />
            <span className="uid">UID:{userInfo.userId || '重新登录后获取'}</span>
          </div>
          {couponList.length > 0 && (
            <div
              className={`couponContainer ${showCouponPanel ? 'couponContainerActive' : ''}`}
              onClick={clickCouponHandle}
            >
              {showCouponPanel ? '收起' : '查看兑换券'}
            </div>
          )}
        </div>
        {showCouponPanel && (
          <div className="couponPanel">
            <div className="couponContent">
              {couponList.length > 0
                ? couponList.map((item, index) => (
                    <div key={index} className="coupon" onClick={handleCouponClick(item)}>
                      <p className="title">{item.name}</p>
                      <p className="time">有效期至 {item.eTime}</p>
                    </div>
                  ))
                : ''}
            </div>
            <div className="couponMask" onClick={closeCouponClick} />
          </div>
        )}
      </div>
      {showCouponDetail && (
        <div className="couponDescContainer">
          <p className="title">免费获得任意路线一条</p>
          <img src={planetIcon} className="couponIcon" />
          <p className="mainTitle">{couponDetail.name}</p>
          <p className="subTitle">有效期至 {couponDetail.eTime}</p>
        </div>
      )}
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
          <div className="orderContainerCenter">
            {orderList.length > 0 ? (
              <>
                {orderList.map((order) => (
                  <div
                    className={`order ${order.state === 'fail' ? 'orderInactive' : ''}`}
                    key={order.orderId}
                    onClick={orderClickHandle(order.state, order.mainClassId, order.groupId)}
                  >
                    <div className="orderInfo">
                      <div className="imgContainer">
                        <div className="btn">{orderState[order.state]}</div>
                        <img src={order.imageUrl} alt="订单图片" />
                      </div>
                      <div className="desc">{`${order.title}丨${order.desc}`}</div>
                      <div className="priceContainer">
                        {order.type === 'group' ? (
                          <>
                            <div className="pricePintuan">
                              <div className="btnPintuanPersonalCenter">拼团价</div>
                              <span>￥</span>
                              {order.avgAmount}
                            </div>
                            <div className="priceOriginal">
                              <span>￥</span>
                              <span className="priceNum">{order.amount}</span>
                            </div>
                          </>
                        ) : (
                          <div className="price">
                            <span>￥</span>
                            {order.amount}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="orderDetail">
                      <div className="orderDetailInfo">
                        <p>订单编号：{order.orderId}</p>
                        <p>创建时间：{timeStampToDate(order.createTime, 'YYYY-MM-DD hh:mm')}</p>
                      </div>
                      <div className="btn" onClick={clipboardHandle(order.orderId)}>
                        一键复制
                      </div>
                    </div>
                  </div>
                ))}
                <EmptyBottom />
              </>
            ) : (
              <EmptyList>{showSearchLoading[0] ? '搜索订单中...' : '你暂时还没有订单记录哦~'}</EmptyList>
            )}
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
              <EmptyList>{showSearchLoading[1] ? '搜索收藏记录中...' : '你暂时还没有收藏记录哦~'}</EmptyList>
            )}
          </div>
        </SwiperSlide>

        {/* 收听列表 */}
        <SwiperSlide>
          <div className="historyContainer">
            {listenList.length > 0 ? (
              <>
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
              </>
            ) : (
              <EmptyList>{showSearchLoading[2] ? '搜索收听记录中...' : '你暂时还没有收听记录哦~'}</EmptyList>
            )}
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="contactContainer">
            <div className="qrcodeContainer">
              <div className="qrcodeItem">
                <p className="title">
                  <span className="important-tips">售后与合作</span>请长按下图添加
                  <br />
                  企业客服微信,企业客服微信无法
                  <br />
                  看到您的朋友圈，请放心添加
                </p>
                <img src={contactWechat} className="qrcode" alt="二维码图片" />
              </div>
              <div className="qrcodeItem">
                <p className="title">
                  <span className="important-tips">意见与反馈</span>请长按下图关注服务号，
                  <br />
                  在对话框中输入您的消息。
                  <br />
                  您的反馈对我们非常重要！
                </p>
                <img src={contactQrcode} className="qrcode" alt="二维码图片" />
              </div>
            </div>
            <EmptyBottom />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

const mapState = ({ personalCenter: { favoritesList, listenList, menuIndex, orderList, couponList } }) => ({
  favoritesList,
  listenList,
  menuIndex,
  orderList,
  couponList,
})

const mapDispatch = ({
  personalCenter: { getFavoritesList, getListenList, setMenuIndex, getOrderList, getCouponList },
}) => ({
  getFavoritesList,
  getListenList,
  setMenuIndex,
  getOrderList,
  getCouponList,
})

export default connect(mapState, mapDispatch)(Index)
