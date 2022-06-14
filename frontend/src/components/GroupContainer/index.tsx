/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2021-12-22 22:57:10
 * @LastEditTime: 2022-06-14 23:37:15
 */
import React, { useState } from 'react'
import Button from '../Button'
import CountDown from '../CountDown'
import './index.scss'

interface Props {
  data: any
  countDownFinishCb: () => void
  btnClickHandle: () => void
}

const typeConfig = {
  // 团长开团
  wait: {
    buttonText: '邀请朋友一起拼',
  },
  // 团长开团
  join: {
    buttonText: '加入该团',
  },
  // 团购失败
  failed: {
    title: '可惜未能成团 直接购买也不错',
    tips: '已结束',
    buttonText: '我要开团',
  },
  // 拼团成功
  success: {
    title: '恭喜 拼团成功',
    tips: '已享受拼团优惠',
    buttonText: '立即收听',
  },
  // 拼团已满
  create: {
    title: '来晚了 团已经满员了',
    tips: '已结束',
    buttonText: '我要开团',
  },
}

function GroupOrder(props: Props) {
  const {
    data: { ownerAvatar, joinAvatar, type, endTime },
    countDownFinishCb,
    btnClickHandle,
  } = props
  console.log('type', type)

  const groupButtonClickHanndle = () => {
    btnClickHandle()
  }

  console.log('type', type)
  return (
    <div className="groupOrderContainer">
      <div className="groupOrderTitle">
        {type === 'wait' || type === 'join' ? (
          <>
            仅差&nbsp;<span>1</span>&nbsp;人参加，即可省钱成功
          </>
        ) : (
          typeConfig[type].title
        )}
      </div>
      <div className="countdownContainer">
        {type === 'wait' || type === 'join' ? (
          <>
            剩余
            <CountDown targetDate={endTime} finishCb={countDownFinishCb} />
            后结束
          </>
        ) : (
          typeConfig[type].tips
        )}
      </div>
      <div className="avaterListContainer">
        <div className="avaterContainer">
          <img src={ownerAvatar} alt="" className="avaterImg" />
          <div className="tag">团长</div>
        </div>
        <div className="avaterContainer">{joinAvatar && <img src={joinAvatar} alt="" className="avaterImg" />}</div>
      </div>
      <Button className="groupButton" onClick={groupButtonClickHanndle}>
        {typeConfig[type].buttonText}
      </Button>
    </div>
  )
}

GroupOrder.defaultProps = {} as Partial<Props>

export default GroupOrder
