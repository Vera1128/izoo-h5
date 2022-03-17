/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2021-12-22 22:54:26
 * @LastEditTime: 2022-03-15 10:03:26
 */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import wx from 'weixin-js-sdk'
import BackIcon from 'src/components/BackIcon'
import OrderPageItem from 'components/OrderPageItem'
import GroupOrder from 'components/GroupContainer'
import StepImg from 'assets/images/step.png'
import { ORDER_TYPE } from 'src/constants/index'

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
  desc: '1',
}

const GroupPage = ({ history, location, match, detailInfo, groupData, getDetailInfo, getSignature, getGroupData }) => {
  console.log('orderPage')
  const {
    params: { id, groupId },
  } = match
  console.log(groupId)
  useEffect(() => {
    getDetailInfo(id)
    getGroupData(groupId)
    getSignature(window.location.href.split('#')[0]).then(() => {
      wx.ready(() => {
        // console.log('购买页wx config ready')
        // const shareInfo = {
        //   title: `${info.title}亲子行走语音导览`,
        //   desc: info.desc || '',
        //   link: window.location.href,
        //   imgUrl: shareConfig.icon, // 分享图标
        //   fail: (res) => {
        //     console.log('设置失败信息', res)
        //   },
        //   success: (res) => {
        //     console.log('设置成功信息', res)
        //   },
        // }
        // wx.updateAppMessageShareData(shareInfo)
        // wx.updateTimelineShareData(shareInfo)
      })
      wx.error((res: any) => {
        console.log('拼单页 wx config error')
        console.log(res)
      })
    })
  }, [])
  if (detailInfo?.info && JSON.stringify(detailInfo?.info) !== '{}') {
    // 添加type
    detailInfo.info.type = ORDER_TYPE.GROUP
    detailInfo.info.duration = detailInfo.duration
    detailInfo.info.totals = detailInfo.totals
  }
  const backClickHandle = () => {
    console.log('backClickHandle')
    history.go(-1)
  }
  return (
    <div className="orderPageContainer">
      <BackIcon clickHandle={backClickHandle} />
      <OrderPageItem
        data={detailInfo?.info && JSON.stringify(detailInfo?.info) !== '{}' ? detailInfo.info : testData}
      />
      <GroupOrder data={0} />
      <img src={StepImg} className="stepIcon" />
    </div>
  )
}

const mapState = ({ detailInfoPage: { detailInfo }, order: { groupData } }) => ({
  detailInfo,
  groupData,
})

const mapDispatch = ({
  detailInfoPage: { getDetailInfo },
  order: { createOrder, getGroupData },
  base: { getSignature },
}) => ({
  getDetailInfo,
  createOrder,
  getSignature,
  getGroupData,
})

export default connect(mapState, mapDispatch)(GroupPage)
