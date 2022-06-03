import moment from 'moment'
import { ObjectId } from 'mongodb'
import { ApiCall } from 'tsrpc'
import { Global } from '../../models/Global'
import { ReqWxNotify, ResWxNotify } from '../../shared/protocols/Order/PtlWxNotify'

export async function ApiWxNotify(call: ApiCall<ReqWxNotify, ResWxNotify>) {

    const out_trade_no = call.req.out_trade_no[0]

    // 根据 out_trade_no 找到对应订单中的数据
    const orderRes = await Global.collection('CashTransaction').findOneAndUpdate({
        'meta.orderId': out_trade_no
    }, {
        $set: {
            state: true,
            updateTime: moment().valueOf()
        }
    }, { returnDocument: 'after' })

    // 调用updateOrder 接口
    if (orderRes.value) {
        const isGroup = orderRes.value.type
        switch (isGroup) {
            case 'single':

                break;

            case 'group':
                // 创建团购订单
                const now = moment().valueOf()

                await Global.collection('GroupRecords').updateOne({
                    mainClassId: orderRes.value.mainClassId,
                    createUserId: orderRes.value.userId,
                    ownerOrderId: orderRes.value.transRecordId
                }, {
                    $setOnInsert: {
                        state: 'wait',
                        createTime: now,
                        endTime: moment(now).add(24, 'minutes').valueOf(),
                        updateTime: now,
                    }
                }, { upsert: true })

                break;

            case 'join':
                // 加入团长的订单
                await Global.collection('GroupRecords').updateOne({
                    _id: ObjectId.createFromHexString(orderRes.value.groupOrderId!),
                    endTime: { $gt: moment().valueOf() },
                }, {
                    $set: {
                        state: 'success',
                        updateTime: moment().valueOf(),
                        joinUserId: orderRes.value.userId
                    }
                })

                break;

            default:
                break;
        }
    }

    call.succ(call.req)

}   
