/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2021-12-01 16:58:44
 * @LastEditTime: 2022-06-14 23:17:46
 */
import React from 'react'
import PinTuanPrice from 'components/PinTuanPrice'
import Tag from '../Tag'
import './index.scss'

interface Props {
  data: {
    /** 内容唯一 id */
    mainClassId: string
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
    /** 描述 */
    desc: string
  }
  clickHandle?: () => void
}

function OrderPageItem(props: Props) {
  const {
    data: { title, tags, scrollImages, amount, avgAmount, duration, totals, type, desc },
    clickHandle,
  } = props

  const clickFn = () => {
    if (clickHandle) clickHandle()
  }
  return (
    <>
      <div className="orderPageItem" onClick={clickFn}>
        <img src={scrollImages[0]} alt="" className="orderPageItemImg" />
        <div className="orderPageContent">
          <p className="desc">{`${title}  |`}</p>
          <p className="desc">{`${desc}`}</p>
          <p className="duration">
            时长{Math.round(duration / 60)}分钟&nbsp;&nbsp;讲解{totals}条
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
OrderPageItem.defaultProps = {
  clickHandle: () => {},
} as Partial<Props>
export default OrderPageItem
