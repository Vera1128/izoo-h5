import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import { notify } from '@tgu/toast'

import FocusOnCom from 'components/FocusOn'
import EmptyBottom from 'src/components/EmptyBottom'
import { AudioGlobal } from 'src/modules/audio'
import { changeCollectStatus } from 'apis/detailPageInfo'

import HomeImg from 'assets/images/home.png'
import ShareImg from 'assets/images/share.png'
import HeartNormalImg from 'assets/images/heart-normal.png'
import HeartCollectImg from 'assets/images/heart.png'

import 'swiper/css'
import 'swiper/css/pagination'
import './index.scss'

SwiperCore.use([Pagination, Autoplay])

const Index = ({ history, match, detailInfo, getDetailInfo, setCollectStatus }) => {
  const {
    params: { id },
  } = match
  useEffect(() => {
    getDetailInfo(id)
    const audioList = [
      'https://izoo-h5.oss-cn-beijing.aliyuncs.com/test.mp3',
      'https://izoo-h5.oss-cn-beijing.aliyuncs.com/8d76354e48e275caf3e59630fa57993e.m4a',
    ]
    AudioGlobal.getInstance().audiosInit(audioList)
  }, [])
  const clickPlayAudio = () => {
    AudioGlobal.getInstance().audioPlay('https://izoo-h5.oss-cn-beijing.aliyuncs.com/test.mp3')
  }
  const { catalogList, info, isCollect, isPayment } = detailInfo
  console.log('******')
  console.log(isCollect)
  const backToMainPage = () => {
    history.go(-1)
  }
  const changeCollectStatusHandle = async () => {
    const res = await changeCollectStatus(id)
    setCollectStatus(res.res.state)
    if (res.res.state) notify('收藏成功', 1000)
    else notify('已取消收藏', 1000)
  }
  return (
    <div className="detailInfoPage">
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
      <div onClick={clickPlayAudio}>点击</div>
      <p dangerouslySetInnerHTML={{ __html: info?.content }} />
      <EmptyBottom color="white" />
      <div className="detailPageMenu">
        <div className="menuContainer1" onClick={backToMainPage}>
          <img src={HomeImg} className="homeIcon" />
          <p className="menuText">首页</p>
        </div>
        <div className="menuContainer1 menuContainerMargin">
          <img src={ShareImg} className="shareIcon" />
          <p className="menuText">分享</p>
        </div>
        <div className="menuContainer1 menuContainerMargin" onClick={changeCollectStatusHandle}>
          <img src={isCollect ? HeartCollectImg : HeartNormalImg} className="heartIcon" />
          <p className="menuText">收藏</p>
        </div>
        <div className="buyContainer">
          <div className="buyItem">
            <p>直接购买</p>
            <p>￥ 108</p>
          </div>
          <div className="buyItem">
            <p>2人拼团</p>
            <p>￥ 88</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapState = ({ detailInfoPage: { detailInfo } }) => ({
  detailInfo,
})

const mapDispatch = ({ detailInfoPage: { getDetailInfo, setCollectStatus } }) => ({
  getDetailInfo,
  setCollectStatus,
})

export default connect(mapState, mapDispatch)(Index)
