import React, { useState } from 'react'
import BackIcon from 'src/components/BackIcon'
import OrderPageItem from 'components/OrderPageItem'
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
    </div>
  )
}

export default OrderPage
