/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2021-12-22 22:54:26
 * @LastEditTime: 2022-04-27 15:44:18
 */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import wx from 'weixin-js-sdk'
import BackIcon from 'src/components/BackIcon'
import OrderPageItem from 'components/OrderPageItem'
import GroupOrder from 'components/GroupContainer'
import Mask from 'components/Mask'
import StepImg from 'assets/images/step.png'
import { ORDER_TYPE } from 'src/constants/index'
import GroupShareImg from 'assets/images/group-share.png'

import './index.scss'
import { wxPaymentUtil } from 'src/utils/wxPaymentUtil'

const shareConfig = require('src/config/share.json')

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
  mainClassId: '',
}

const GroupPage = ({ history, location, match, detailInfo, groupData, getDetailInfo, getSignature, getGroupData }) => {
  console.log('orderPage')
  const {
    params: { id, groupId },
  } = match
  let groupInfo = null
  const [showShareMask, setShowShareMask] = useState(false)
  const [showBack, setShowBack] = useState(true)

  useEffect(() => {
    if (history.length < 2) {
      setShowBack(false)
    }
    getDetailInfo(id)
    getGroupData(groupId)
  }, [])

  useEffect(() => {
    if (detailInfo && JSON.stringify(detailInfo) !== '{}') {
      const { info } = detailInfo
      getSignature(window.location.href.split('#')[0]).then(() => {
        wx.ready(() => {
          console.log('拼团页wx config ready', info)
          const shareInfo = {
            title: `【还差1人】￥${info.avgAmount}抢${info.title}亲子行走语音导览亲子行走语音导览`,
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

  if (groupData) {
    const { ownerAvatar, joinAvatar, type, endTime, mainClassId } = groupData
    groupInfo = {
      ownerAvatar,
      joinAvatar,
      type,
      endTime,
      mainClassId,
    }
  }

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

  const countDownFinishCb = () => {
    console.log('倒计时完成')
    getGroupData(groupId)
  }

  const groupBtnClick = (type) => () => {
    console.log(type)
    switch (type) {
      case 'wait': // 邀请朋友一起拼
        setShowShareMask(true)
        break
      case 'join': // 加入该团
        joinGroupHandle()
        break
      case 'failed': // 我要开团
        creatGroup()
        break
      case 'success': // 立即收听
        history.push(`/detailInfoPage/${groupData.mainClassId}`)
        break
      case 'create': // 我要开团
        creatGroup()
        break
      default:
        console.log(type)
    }
  }
  // 加入该团
  const joinGroupHandle = async () => {
    await wxPaymentUtil.payment({
      mainClassId: groupData.mainClassId,
      type: 'join',
      groupOrderId: match.params.groupId,
    })
  }

  // 我要开团
  const creatGroup = () => {
    console.log(groupData.mainClassId)
    history.push(`/order/group?routeId=${groupData.mainClassId}`)
  }

  // 点击拼团上的景点进入详情
  const goToRouteDetail = () => {
    history.push(`/detailInfoPage/${groupData.mainClassId}`)
  }

  console.log('groupData', groupData)
  return (
    <div className="orderPageContainer">
      {showBack && <BackIcon clickHandle={backClickHandle} />}
      <OrderPageItem
        data={detailInfo?.info && JSON.stringify(detailInfo?.info) !== '{}' ? detailInfo.info : testData}
        clickHandle={goToRouteDetail}
      />
      {groupInfo && (
        <GroupOrder
          data={groupInfo}
          countDownFinishCb={countDownFinishCb}
          btnClickHandle={groupBtnClick(groupInfo.type)}
        />
      )}
      <img src={StepImg} className="stepIcon" />
      {showShareMask && (
        <Mask onClickHandle={() => setShowShareMask(false)}>
          <img src={GroupShareImg} className="shareImg" />
        </Mask>
      )}
    </div>
  )
}

const mapState = ({ detailInfoPage: { detailInfo }, order: { groupData } }) => ({
  detailInfo,
  groupData,
})

const mapDispatch = ({ detailInfoPage: { getDetailInfo }, order: { getGroupData }, base: { getSignature } }) => ({
  getDetailInfo,
  getSignature,
  getGroupData,
})

export default connect(mapState, mapDispatch)(GroupPage)
