import React, { useState } from 'react'
import BackIcon from 'src/components/BackIcon'
import OrderPageItem from 'components/OrderPageItem'
import GroupOrder from 'components/GroupContainer'
import SwiperTestImg from 'assets/images/swiper-test.png'
import StepImg from 'assets/images/step.png'

import './index.scss'

const testData = {
  title: '测试title',
  tags: ['1636646219890'],
  amount: 15,
  avgAmount: 10,
  scrollImages: [
    'https://oss.catfill.cn/web/images/武康大楼.JPG',
    'https://oss.catfill.cn/web/images/罗密欧阳台.jpg',
    'https://oss.catfill.cn/web/images/密丹公寓.JPG',
  ],
  duration: 400,
  totals: 10,
  type: 'group',
}

const GroupPage = () => {
  console.log('orderPage')
  const backClickHandle = () => {
    console.log('backClickHandle')
  }
  return (
    <div className="orderPageContainer">
      <BackIcon clickHandle={backClickHandle} />
      <OrderPageItem data={testData} />
      <GroupOrder data={1} />
      <img src={StepImg} className="stepIcon" />
    </div>
  )
}

export default GroupPage
