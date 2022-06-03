import apiClient from 'src/apis/apiClient'
import { createOrder, refreshOrder } from 'src/apis/order'
import { ORDER_TYPE } from 'src/constants'
import wx from 'weixin-js-sdk'

export class wxPaymentUtil {
  static async payment(params: {
    /** 景点内容唯一id */
    mainClassId: string
    /** 支付类型 */
    type: 'group' | 'single' | 'join'
    /** 手机号 */
    phone?: number
    /** 加入团购时携带, type === join 时携带 */
    groupOrderId?: string
    paySuccessCB: (groupId: string) => void
  }) {
    const res = await createOrder({
      mainClassId: params.mainClassId,
      phone: params.phone, // TODO @杨杨
      type: params.type,
      groupOrderId: params.groupOrderId,
    })
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
            const orderInfo = await refreshOrder(orderId)
            console.log('刷新支付订单数据', orderInfo)
            if (orderInfo.isSucc) {
              params.paySuccessCB(orderInfo.res.groupId)
              /**
               * 刷新订单成功,
               * 如果订单无异常,调用GroupData,获取团购订单数据信息.
               * 刷新界面
               */
              // const groupData = await apiClient.callApi('Order/GroupData', { groupId: orderInfo.res.groupId })
              // console.log('团购订单返回', groupData)
            }
          }
        },
        // 支付取消回调函数
        cancel: function (res) {
          console.log('支付取消', res)
        },
        // 支付失败回调函数
        fail: function (res) {
          console.log('支付失败~', res)
        },
      })
    }
  }
}
