import React from 'react'
import PinTuanPrice from 'components/PinTuanPrice'
import bottomBorder from 'assets/images/bottom-border.png'
import Tag from '../Tag'
import './index.scss'

interface Props {
  data: {
    imgSrc: string
    tagList: Array<string>
    name: string
    duration: number
    totals: number
    price: number
    isPinTuan: boolean
    pinTuanPrice: number
  }
}

function OrderPageItem(props: Props) {
  const {
    data: { imgSrc, tagList, name, duration, totals, price, isPinTuan, pinTuanPrice },
  } = props
  return (
    <>
      <div className="orderPageItem">
        <img src={imgSrc} alt="" className="orderPageItemImg" />
        <div className="orderPageContent">
          <p className="desc">{name}</p>
          <p className="duration">
            时长{duration}分钟&nbsp;&nbsp;讲解{totals}条
          </p>
          <div className="tagList">
            {tagList.map((item) => (
              <Tag key={item} text={item} className="tag" />
            ))}
          </div>
          <div className={`price ${isPinTuan ? 'pricePinTuan' : ''}`}>
            {isPinTuan ? (
              <>
                <PinTuanPrice price={pinTuanPrice} />
                <p>￥{price}</p>
              </>
            ) : (
              <>￥{price}</>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderPageItem
