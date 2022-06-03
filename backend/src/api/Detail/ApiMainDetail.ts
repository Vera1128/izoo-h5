import { ObjectId } from "bson";
import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { MainUtil } from "../../models/MainUtil";
import { ReqMainDetail, ResMainDetail } from "../../shared/protocols/Detail/PtlMainDetail";

export async function ApiMainDetail(call: ApiCall<ReqMainDetail, ResMainDetail>) {

    let isPay: boolean = false

    let mainRes = await Global.collection('ContentMainClass').findOne({
        _id: ObjectId.createFromHexString(call.req.mainClassId),
        isDel: false,
    })

    mainRes = await MainUtil.mainClassToTags(mainRes)

    // 检测是否收藏
    let userRes = await Global.collection('CollectData').findOne({
        mainClassId: call.req.mainClassId,
        userId: call.currentUser.userId
    })

    // 个人、团购不同检测
    // 检测是否支付
    let opCash = await Global.collection('CashTransaction').findOne({
        userId: call.currentUser.userId,
        mainClassId: call.req.mainClassId,
        state: true
    })
    if (opCash && opCash.type === 'group') {
        isPay = await Global.collection('GroupRecords').find({
            mainClassId: call.req.mainClassId,
            createUserId: call.currentUser.userId,
            state: 'success'
        }).hasNext()
    } else if (opCash && opCash.type === 'join') {
        isPay = await Global.collection('GroupRecords').find({
            mainClassId: call.req.mainClassId,
            joinUserId: call.currentUser.userId,
            state: 'success'
        }).hasNext()
    } else if (opCash && opCash.type === 'single') {
        isPay = true
    }

    // 检测是否已经被优惠券使用
    const isCoupon = await Global.collection('CouponStat').findOne({
        uid: call.currentUser.userId,
        mainClassId: call.req.mainClassId,
        state: true
    })

    if (isCoupon) {
        isPay = true
    }

    let subRes = await Global.collection('ContentSubClass').findOne({
        mainClassId: call.req.mainClassId
    })

    const totals = subRes ? subRes.subClassList.length : 0

    let durationArr = await Global.collection('ContentValueClass').aggregate([
        {
            $match: {
                mainClassId: call.req.mainClassId
            }
        },
        {
            $group: {
                _id: "$mainClassId",
                sum: {
                    $sum: '$duration'
                }
            }
        }
    ]).toArray()


    call.succ({
        info: mainRes,
        isCollect: userRes ? userRes.state : false,
        isPayment: isPay,
        duration: durationArr.length > 0 ? durationArr[0].sum : 0,
        totals: totals
    })

}