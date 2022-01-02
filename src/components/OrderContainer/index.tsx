import React from 'react'
import PinTuanPrice from 'components/PinTuanPrice'
import './index.scss'

interface Props {
  data: any
}

function Order(props: Props) {
  console.log(props.data)
  return (
    <div className="orderContainer">
      <div className="orderContainerItem">
        <div className="itemLabel">单价</div>
        <div className="itemContent">
          <PinTuanPrice price={200} />
          <div className="originPrice">
            <span>￥</span>
            199
          </div>
        </div>
      </div>
      <div className="orderContainerItem">
        <div className="itemLabel">购买数量</div>
        <div className="itemContent">1</div>
      </div>
      <div className="orderContainerItem">
        <div className="itemLabel">手机号码</div>
        <div className="itemContent">
          <input className="input" placeholder="请输入手机号" />
        </div>
      </div>
      <div className="orderContainerItem">
        <div className="orderSum">
          合计&nbsp;&nbsp;<span>￥</span>120
        </div>
      </div>
    </div>
  )
}

Order.defaultProps = {} as Partial<Props>

export default Order
