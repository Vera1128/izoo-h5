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

import { getPxCurr } from 'utils/index'
import SwiperTestImg from 'assets/images/swiper-test.png'
import heart from 'assets/images/heart.png'

import './index.scss'
import 'swiper/css'

const distance = getPxCurr(196)
let mySwiper = null

const data = [
  { id: 1, text: 'End of summer reading list', date: '1.03.2016' },
  { id: 2, text: 'Somewhere in the middle 📸', date: '23.01.2017' },
  { id: 3, text: 'Good morning to 9M of you?!?! ❤️🙏🏻Feeling very grateful and giddy.', date: '12.01.2019' },
]

const Index = ({ getFavoritesList, getListenList, favoritesList, history }) => {
  const [currIndex, setCurrIndex] = useState(0)
  const [menuIndex, setMenuIndex] = useState(0)

  useEffect(() => {
    getFavoritesList()
    getListenList()
  }, [])

  const showDeleteIcon = (index) => {
    console.log('出现delete icon')
  }

  const dragStartHandle = (index) => {
    setCurrIndex(index)
  }

  const clickMenuHandle = (index) => () => {
    setMenuIndex(index)
    mySwiper.slideTo(index)
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

  return (
    <div className="personalCenterContainer">
      <div className="userInfo">
        <img src={SwiperTestImg} alt="头像" className="avater" />
        <span className="name">小布</span>
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
                {/* <div className="priceContainer">
                  <div className="price">
                    <span>￥</span>120
                  </div>
                </div> */}
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
          </div>
        </SwiperSlide>

        {/* 收藏列表 */}
        <SwiperSlide>
          <div className="collectContainer">
            {favoritesList.length > 0 ? (
              <>
                <div className="tips">根据收藏时间&nbsp;从最近到最早</div>
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
                        <img src={item.scrollImage} />
                        <div className="centerContainer">
                          <div className="textContainer">{item.desc}</div>
                          <div className="tagList">
                            {item.tags.map((tag) => (
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
                    <div className="deleteIcon">删除</div>
                  </div>
                ))}
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
              <div className="historyListRow">
                <div className="historyItem">
                  <img src={SwiperTestImg} className="itemImg" />
                  <div className="placeContainer">武康路武康路武康路武康路武康路</div>
                  <div className="desc">上海租界历史的缩影</div>
                </div>
                <div className="historyItem">
                  <img src={SwiperTestImg} className="itemImg" />
                  <div className="placeContainer">武康路武康路武康路武康路武康路</div>
                  <div className="desc">上海租界历史的缩影</div>
                </div>
              </div>
              <div className="historyListRow">
                <div className="historyItem">
                  <img src={SwiperTestImg} className="itemImg" />
                  <div className="placeContainer">武康路武康路武康路武康路武康路</div>
                  <div className="desc">上海租界历史的缩影</div>
                </div>
                <div className="historyItem">
                  <img src={SwiperTestImg} className="itemImg" />
                  <div className="placeContainer">武康路武康路武康路武康路武康路</div>
                  <div className="desc">上海租界历史的缩影</div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="contactContainer">
            <p className="contactNumber">
              订单售后&nbsp;&nbsp;<a href="tel:177 4820 6510">177 4820 6510 </a>
              <br />
              <br />
              商务合作&nbsp;&nbsp;<a href="tel:400 8886666">400 8886666 </a>
              <br />
              <br />
            </p>
            <p className="contactNumber recommendContainer">
              <br />
              意见反馈 <br />
              <br />
              请在“爱走星球”公众号的对话框中以文字或语音输入您的意见和反馈。 您的意见对我们非常重要！
              <br />
              <br />
            </p>
            <FocusOn showCloseIcon={false} />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

const mapState = ({ personalCenter: { favoritesList, listenList } }) => ({
  favoritesList,
  listenList,
})

const mapDispatch = ({ personalCenter: { getFavoritesList, getListenList } }) => ({
  getFavoritesList,
  getListenList,
})

export default connect(mapState, mapDispatch)(Index)
