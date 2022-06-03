import moment from 'moment'
import { ObjectId } from 'mongodb'
import { ApiCall } from 'tsrpc'
import { Global } from '../../models/Global'
import { couponItem, ReqGetCoupon, ResGetCoupon } from '../../shared/protocols/Center/PtlGetCoupon'

export async function ApiGetCoupon(call: ApiCall<ReqGetCoupon, ResGetCoupon>) {

  const arr: couponItem[] = []

  const couponRes = await Global.collection('CouponStat').find({
    uid: call.currentUser.userId
  }).sort({ createTime: 1 }).toArray()


  for (let i = 0; i < couponRes.length; i++) {
    const item = couponRes[i]
    const couponInfo = await Global.collection('Coupon').findOne({
      _id: ObjectId.createFromHexString(item.couponId)
    })

    if (couponInfo) {
      const state = item.state === true ? 'used' : item.state === false ? 'wait' : moment(couponInfo.dateTime[1]).valueOf() < moment().valueOf() ? 'expired' : 'expired'
      arr.push({
        couponId: item.couponId,
        name: couponInfo.name,
        state,
        sTime: couponInfo.dateTime[0],
        eTime: couponInfo.dateTime[1]
      })
    }

  }

  call.succ({
    list: arr
  })


}