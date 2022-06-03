/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2021-12-23 10:36:59
 * @LastEditTime: 2022-04-05 16:14:50
 */
import React, { FC, useState, useEffect } from 'react'
import './index.scss'

interface IProps {
  targetDate: number
  finishCb: () => void
}
let timer = window.setTimeout(() => {})

const CountDown: FC<IProps> = ({ targetDate, finishCb = () => {} }) => {
  const [day, setDay] = useState('00')
  const [hour, setHour] = useState('00')
  const [minute, setMinute] = useState('00')
  const [second, setSecond] = useState('00')
  const targetTime = targetDate

  const formatTime = (t: any) => {
    if (t < 10) return `0${t}`
    return t.toString()
  }

  const countTime = () => {
    const now = Date.now()
    const end = targetTime
    const leftTime = end - now
    let d = 0
    let h = 0
    let m = 0
    let s = 0
    if (leftTime >= 0) {
      d = Math.floor(leftTime / 1000 / 60 / 60 / 24)
      h = Math.floor((leftTime / 1000 / 60 / 60) % 24) || 0
      m = Math.floor((leftTime / 1000 / 60) % 60) || 0
      s = Math.floor((leftTime / 1000) % 60) || 0
      setDay(d.toString())
      setHour(formatTime(h))
      setMinute(formatTime(m))
      setSecond(formatTime(s))
      window.clearTimeout(timer)
      timer = window.setTimeout(countTime, 1000)
    } else {
      finishCb()
    }
  }
  useEffect(() => {
    setSecond('60')
    timer = window.setTimeout(countTime, 1000)
  }, [])

  useEffect(() => {
    countTime()
    return () => {
      window.clearTimeout(timer)
    }
  }, [second])

  return (
    <div className="countDownContainer">
      <div className="countDown">{hour}</div>&nbsp;:&nbsp;
      <div className="countDown">{minute}</div>&nbsp;:&nbsp;
      <div className="countDown">{second}</div>
    </div>
  )
}

export default CountDown
