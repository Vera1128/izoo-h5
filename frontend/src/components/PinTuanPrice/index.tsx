import React from 'react'
import './index.scss'

interface Props {
  className?: string
  price: number
}

function PinTuanPrice(props: Props) {
  const { price, className } = props
  return (
    <div className={`pricePintuan ${className}`}>
      <div className="btnPintuan">拼团价</div>
      <span>￥</span>
      {price}
    </div>
  )
}

PinTuanPrice.defaultProps = {
  className: '',
} as Partial<Props>

export default PinTuanPrice
