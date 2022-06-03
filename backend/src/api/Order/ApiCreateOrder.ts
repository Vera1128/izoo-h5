import moment from 'moment'
import { ObjectId } from 'mongodb'
import { ApiCall } from 'tsrpc'
import { BackConfig } from '../../configs/BackConfig'
import { Global } from '../../models/Global'
import Cash from '../../models/Payment/Cash'
import { WXTransfersRes } from '../../models/Payment/WXPay/WXPay'
import { ReqCreateOrder, ResCreateOrder } from '../../shared/protocols/Order/PtlCreateOrder'

export async function ApiCreateOrder(call: ApiCall<ReqCreateOrder, ResCreateOrder>) {

  const type = call.req.type

  let mainClassRes = await Global.collection('ContentMainClass').findOne({
    _id: ObjectId.createFromHexString(call.req.mainClassId),
    isDel: false,
    state: true
  })

  if (!mainClassRes) {
    return call.error('景点内容不存在')
  }

  let result: WXTransfersRes | undefined = {} as any

  switch (type) {
    case 'group':

      result = await Cash.toPays(
        {
          type: type,
          userId: call.currentUser.userId!,
          mainClassId: call.req.mainClassId,
          price: mainClassRes.avgAmount,
          realIp: Global.realIp,
          phone: call.req.phone
        },
        call.logger
      )
      break

    case 'single':

      result = await Cash.toPays(
        {
          type: type,
          userId: call.currentUser.userId!,
          mainClassId: call.req.mainClassId,
          price: mainClassRes.amount,
          realIp: Global.realIp,
          phone: call.req.phone
        },
        call.logger
      )

      break

    case 'join':

      result = await Cash.toPays({
        type: type,
        groupOrderId: call.req.groupOrderId!,
        userId: call.currentUser.userId!,
        mainClassId: call.req.mainClassId,
        price: mainClassRes.avgAmount,
        realIp: Global.realIp,
        phone: call.req.phone
      })

      break;

    default:
      break

  }

  if (!result) {

    return call.error(`Pay Error: [${result}]`)

  }

  call.succ({
    orderId: result.orderId!,
    timestamp: moment().unix().valueOf(),
    signType: 'MD5',
    appId: BackConfig.WXPAY.appid,
    nonceStr: result.nonce_str!,
    prepay_id: 'prepay_id=' + result.prepay_id!,
    paySign: result.sign!
  })

}