import { ObjectId } from "mongodb";
import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { ReqUseCoupon, ResUseCoupon } from "../../shared/protocols/Order/PtlUseCoupon";

export async function ApiUseCoupon(call: ApiCall<ReqUseCoupon, ResUseCoupon>) {

    const couponInfo = await Global.collection('CouponStat').find({
        uid: call.currentUser.userId,
        state: false
    }).sort({ createTime: 1 }).limit(1).toArray()

    if (!couponInfo || couponInfo.length <= 0) {
        return call.error('优惠券不存在或已使用~')
    }

    const mainClassInfo = await Global.collection('ContentMainClass').findOne({
        _id: ObjectId.createFromHexString(call.req.mainClassId),
        isDel: false
    })

    if (!mainClassInfo) {
        return call.error('景点内容不存在')
    }

    await Global.collection('CouponStat').findOneAndUpdate({
        uid: call.currentUser.userId,
        couponId: couponInfo[0].couponId,
        state: false
    }, {
        $set: {
            useTIme: new Date(),
            state: true,
            mainClassId: call.req.mainClassId
        }
    })


    call.succ({})

}