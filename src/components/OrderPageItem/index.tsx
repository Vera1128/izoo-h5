/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2021-12-01 16:58:44
 * @LastEditTime: 2022-02-13 17:56:17
 */
import React from 'react'
import PinTuanPrice from 'components/PinTuanPrice'
import Tag from '../Tag'
import './index.scss'

interface Props {
  data: {
    title: string
    /** 标签 */
    tags: string[]
    /** 金额 */
    amount: number
    /** 拼团金额 */
    avgAmount: number
    /** 轮播图片 */
    scrollImages: string[]
    /** 音频总时长 */
    duration: number
    /** 内容条数 */
    totals: number
    /**
     * type: 订单类型
     * group: 团购
     * single: 单买
     */
    type: string
  }
}

function OrderPageItem(props: Props) {
  const {
    data: { tags, scrollImages, amount, avgAmount, duration, totals, type },
  } = props
  return (
    <>
      <div className="orderPageItem">
        <img src={scrollImages[0]} alt="" className="orderPageItemImg" />
        <div className="orderPageContent">
          <p className="desc">desc待定</p>
          <p className="duration">
            时长{duration}分钟&nbsp;&nbsp;讲解{totals}条
          </p>
          <div className="tagList">
            {tags.map((item) => (
              <Tag key={item} text={item} className="tag" />
            ))}
          </div>
          <div className={`price ${type === 'group' ? 'pricePinTuan' : ''}`}>
            {type === 'group' ? (
              <>
                <PinTuanPrice price={avgAmount} />
                <p>￥{amount}</p>
              </>
            ) : (
              <>
                <span>￥</span>
                {amount}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderPageItem
