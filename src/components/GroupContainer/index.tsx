/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2021-12-22 22:57:10
 * @LastEditTime: 2022-04-05 17:21:28
 */
import React, { useState } from 'react'
import Button from '../Button'
import CountDown from '../CountDown'
import './index.scss'

interface Props {
  data: any
}

const groupStatusConfig = {
  // 团长开团
  wait: {
    buttonText: '邀请朋友一起拼',
  },
  failed: {
    title: '团购订单失败 到期并无人参与',
    tips: '已结束',
    buttonText: '我要开团',
  },
  // 加入该团
  1: {
    buttonText: '加入该团',
  },
  // 拼团成功
  2: {
    title: '恭喜 拼团成功',
    tips: '已享受拼团优惠',
    buttonText: '立即收听',
  },
  // 拼团结束
  3: {
    title: '来晚了 团已经满员了',
    tips: '已结束',
    buttonText: '我要开团',
  },
}

function GroupOrder(props: Props) {
  const {
    data: { ownerAvatar, joinAvatar, type, endTime },
  } = props
  console.log('type', type)
  const [groupStatus, setGroupStatus] = useState(type)
  const countDownFinishCb = () => {
    console.log('倒计时结束')
    // setGroupStatus(2)
  }
  const groupButtonClickHanndle = () => {}

  console.log('groupStatus', groupStatus)
  return (
    <div className="groupOrderContainer">
      <div className="groupOrderTitle">
        {groupStatus === 'wait' ? (
          <>
            仅差&nbsp;<span>1</span>&nbsp;人参加，即可省钱成功
          </>
        ) : (
          groupStatusConfig[groupStatus].title
        )}
      </div>
      <div className="countdownContainer">
        {groupStatus === 'wait' ? (
          <>
            剩余
            <CountDown targetDate={endTime} finishCb={countDownFinishCb} />
            后结束
          </>
        ) : (
          groupStatusConfig[groupStatus].tips
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
        {groupStatusConfig[groupStatus].buttonText}
      </Button>
    </div>
  )
}

GroupOrder.defaultProps = {} as Partial<Props>

export default GroupOrder
