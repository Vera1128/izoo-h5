import React from 'react'
import PinTuanPrice from 'components/PinTuanPrice'
import './index.scss'

interface Props {
  data: any
  validate: (boolean) => void
}

function Order(props: Props) {
  const { validate } = props
  const { data } = props
  const inputPhoneNum = (e) => {
    console.log(e.target.value)
    const {
      target: { value },
    } = e
    if (/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
      validate(true)
    } else validate(false)
  }
  return (
    <div className="orderContainer">
      <div className="orderContainerItem">
        <div className="itemLabel">单价</div>
        <div className="itemContent">
          {data.type === 'group' && <PinTuanPrice price={data.avgAmount} />}
          <div className={`originPrice ${data.type === 'group' ? 'pricePinTuan' : ''}`}>
            <span>￥</span>
            {data.amount}
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
          <input className="input" placeholder="请输入手机号" onInput={inputPhoneNum} />
        </div>
      </div>
      <div className="orderContainerItem">
        <div className="orderSum">
          合计&nbsp;&nbsp;<span>￥</span>
          {data.type === 'single' ? data.amount : data.avgAmount}
        </div>
      </div>
    </div>
  )
}

Order.defaultProps = {} as Partial<Props>

export default Order
