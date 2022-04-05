/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2022-02-20 18:29:24
 * @LastEditTime: 2022-04-05 16:26:22
 */
import _ from 'lodash'
import wx from 'weixin-js-sdk'
import { createOrder, refreshOrder, getGroupData } from 'apis/order'
import { ORDER_TYPE } from 'src/constants/index'
import * as scheme from '../schemes/index'

export default {
  name: 'order',
  state: {
    groupData: null,
  },

  effects: (dispatch) => ({
    async createOrder(propsReq: scheme.createOrderProps) {
      console.log('订单是否是团购', propsReq.orderType === ORDER_TYPE.GROUP)
      const res = await createOrder(propsReq.reqOrder)
      if (res) {
        const { timestamp, signType, nonceStr, prepay_id, paySign, orderId } = res.res
        wx.chooseWXPay({
          // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          timestamp: timestamp,
          // 支付签名随机串，不长于 32 位
          nonceStr: nonceStr,
          // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          package: prepay_id,
          // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          signType: signType,
          // 支付签名
          paySign: paySign,
          // 支付成功后的回调函数
          success: async function (res) {
            // res.errMsg === 'chooseWXPay:ok'方式判断前端返回,微信团队郑重提示：
            // res.errMsg将在用户支付成功后返回ok，但并不保证它绝对可靠， 切记。
            if (res.errMsg === 'chooseWXPay:ok') {
              console.log('微信支付成功')
              if (propsReq.orderType === ORDER_TYPE.GROUP) {
                const res = await refreshOrder(orderId)
                console.log('团购订单返回', res.res.groupId)
                propsReq.paySuccess(res?.res?.groupId)
              } else propsReq.paySuccess('')
            }
          },
          // 支付取消回调函数
          cancel: function (res) {
            console.log('支付取消')
            console.log(res)
            propsReq.payCancel()
          },
          // 支付失败回调函数
          fail: function (res) {
            console.log('支付失败~')
            console.log(res)
            propsReq.payFail()
          },
        })
      }
    },
    async getGroupData(groupId) {
      const res = await getGroupData(groupId)
      if (res) {
        const { ownerAvatar, joinAvatar, type, endTime } = res.res
        dispatch.order.setGroupData({
          ownerAvatar,
          joinAvatar,
          type,
          endTime,
        })
      }
    },
  }),

  reducers: {
    setGroupData(state, payload) {
      return {
        ...state,
        groupData: payload,
      }
    },
  },
}
