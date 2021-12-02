import React, { useState } from 'react'
import BackIcon from 'src/components/BackIcon'
import OrderPageItem from 'components/OrderPageItem'
import PinTuanPrice from 'components/PinTuanPrice'
import SwiperTestImg from 'assets/images/swiper-test.png'

import './index.scss'

const testData = {
  imgSrc: SwiperTestImg,
  tagList: ['科学发展', '经济政策'],
  name: '沪港银行历史展览馆丨认识货币与近代中国',
  duration: 20,
  totals: 36,
  price: 199,
  isPinTuan: true,
  pinTuanPrice: 200,
}

const OrderPage = () => {
  console.log('orderPage')
  const backClickHandle = () => {
    console.log('backClickHandle')
  }
  return (
    <div className="orderPageContainer">
      <BackIcon clickHandle={backClickHandle} />
      <OrderPageItem data={testData} />
      <div className="orderContainer">
        <div className="orderContainerItem">
          <div className="itemLabel">单价</div>
          <div className="itemContent">
            <PinTuanPrice price={200} />
            <div className="originPrice">
              <span>￥</span>
              199
            </div>
          </div>
        </div>
        <div className="orderContainerItem">
          <div className="itemLabel">购买数量</div>
          <div className="itemContent">1</div>
        </div>
        <div className="orderContainerItem">
          <div className="itemLabel">手机号码</div>
          <div className="itemContent">
            <input className="input" placeholder="请输入手机号" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPage
