/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2021-12-22 22:57:10
 * @LastEditTime: 2022-03-15 10:05:19
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
  0: {
    buttonText: '邀请朋友一起拼',
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
  console.log(props.data)
  const [groupStatus, setGroupStatus] = useState(0)
  const countDownFinishCb = () => {
    console.log('倒计时结束')
    setGroupStatus(2)
  }

  console.log('groupStatus', groupStatus)
  return (
    <div className="groupOrderContainer">
      <div className="groupOrderTitle">
        {groupStatus === 0 || groupStatus === 1 ? (
          <>
            仅差&nbsp;<span>1</span>&nbsp;人参加，即可省钱成功
          </>
        ) : (
          groupStatusConfig[groupStatus].title
        )}
      </div>
      <div className="countdownContainer">
        {groupStatus === 0 || groupStatus === 1 ? (
          <>
            剩余
            <CountDown targetDate="2022-03-15 10:20:00" finishCb={countDownFinishCb} />
            后结束
          </>
        ) : (
          groupStatusConfig[groupStatus].tips
        )}
      </div>
      <div className="avaterListContainer">
        <div className="avaterContainer">
          1<div className="tag">团长</div>
        </div>
        <div className="avaterContainer">1</div>
      </div>
      <Button className="groupButton">{groupStatusConfig[groupStatus].buttonText}</Button>
    </div>
  )
}

GroupOrder.defaultProps = {} as Partial<Props>

export default GroupOrder
