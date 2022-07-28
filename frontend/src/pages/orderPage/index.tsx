import React, { useState, useEffect } from 'react'
import { notify } from '@tgu/toast'
import { connect } from 'react-redux'
import { getQueryParam } from 'utils/index'
import BackIcon from 'components/BackIcon'
import OrderPageItem from 'components/OrderPageItem'
import Menu from 'components/MenuOrder'
import Button from 'components/Button'
import Order from 'components/OrderContainer'
import EmptyBottom from 'src/components/EmptyBottom'
import GroupRules from 'src/components/GroupRules'
import { ORDER_TYPE } from 'src/constants/index'
import StepImg from 'assets/images/step.png'

import './index.scss'

const testData = {
  title: '测试title',
  tags: ['1636646219890'],
  amount: 15,
  avgAmount: 10,
  scrollImages: [
    'https://oss.catfill.cn/web/images/武康大楼.JPG',
    'https://oss.catfill.cn/web/images/罗密欧阳台.jpg',
    'https://oss.catfill.cn/web/images/密丹公寓.JPG',
  ],
  duration: 400,
  totals: 10,
  type: 'single',
  desc: '1',
}

const OrderPage = ({ history, location, match, detailInfo, getDetailInfo, createOrder }) => {
  const id = getQueryParam('routeId', location.search.substring(1))
  const {
    params: { type },
  } = match
  const [canSubmit, setCanSubmit] = useState(false)
  const { info } = detailInfo

  useEffect(() => {
    getDetailInfo(id)
  }, [])
  if (detailInfo?.info && JSON.stringify(detailInfo?.info) !== '{}') {
    // 添加type
    detailInfo.info.type = type
    detailInfo.info.duration = detailInfo.duration
    detailInfo.info.totals = detailInfo.totals
  }
  const backClickHandle = () => {
    console.log('backClickHandle')
    history.go(-1)
  }
  const phoneNumValidate = (res) => {
    console.log('手机号校验', res)
    setCanSubmit(res)
  }
  const submitOrder = () => {
    if (!canSubmit) {
      notify('请输入正确的手机号', 2000)
      return
    }
    const paySuccessCB = (groupId) => {
      if (type === ORDER_TYPE.SINGLE) {
        history.replace({ pathname: `/routeListPage/${id}` })
      } else if (type === ORDER_TYPE.GROUP) {
        history.push({ pathname: `/group/${id}/${groupId}` })
      }
    }
    const payCancelCB = () => {}
    const payFailCB = () => {}
    createOrder({
      reqOrder: {
        type,
        mainClassId: id,
      },
      orderType: type,
      paySuccess: paySuccessCB,
      payCancel: payCancelCB,
      payFail: payFailCB,
    })
  }
  return (
    <div className="orderPageContainer">
      <BackIcon clickHandle={backClickHandle} />
      <OrderPageItem
        data={detailInfo?.info && JSON.stringify(detailInfo?.info) !== '{}' ? detailInfo.info : testData}
      />
      <Order
        data={detailInfo?.info && JSON.stringify(detailInfo?.info) !== '{}' ? detailInfo.info : testData}
        validate={phoneNumValidate}
      />
      {type === ORDER_TYPE.GROUP && <img src={StepImg} className="stepIcon" />}
      <GroupRules />
      <EmptyBottom color="#eee" />
      <Menu className="orderMenu">
        <div className="priceContainer">
          支付 <span className="smallIcon">￥</span>
          <span className="price">{type === 'single' ? detailInfo?.info?.amount : detailInfo?.info?.avgAmount}</span>
        </div>
        <Button className={`orderButtonInvalid ${canSubmit ? 'orderButton' : ''}`} onClick={submitOrder}>
          提交订单
        </Button>
      </Menu>
    </div>
  )
}

const mapState = ({ detailInfoPage: { detailInfo } }) => ({
  detailInfo,
})

const mapDispatch = ({ detailInfoPage: { getDetailInfo }, order: { createOrder } }) => ({
  getDetailInfo,
  createOrder,
})

export default connect(mapState, mapDispatch)(OrderPage)
