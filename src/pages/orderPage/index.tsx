import React, { useState } from 'react'
import BackIcon from 'src/components/BackIcon'
import OrderPageItem from 'components/OrderPageItem'
import Menu from 'components/MenuOrder'
import Button from 'components/Button'
import Order from 'components/OrderContainer'
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

const OrderPage = ({ history, location }) => {
  console.log('orderPage', location)
  const backClickHandle = () => {
    console.log('backClickHandle')
    history.go(-1)
  }
  return (
    <div className="orderPageContainer">
      <BackIcon clickHandle={backClickHandle} />
      <OrderPageItem data={testData} />
      <Order data={1} />
      <Menu className="orderMenu">
        <div className="priceContainer">
          支付 <span className="smallIcon">￥</span>
          <span className="price">88</span>
        </div>
        <Button className="orderButton">提交订单</Button>
      </Menu>
    </div>
  )
}

export default OrderPage
