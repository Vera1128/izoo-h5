import { ObjectId } from "mongodb";
import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { ReqRefreshOrder, ResRefreshOrder } from "../../shared/protocols/Order/PtlRefreshOrder";

export async function ApiRefreshOrder(call: ApiCall<ReqRefreshOrder, ResRefreshOrder>) {

    // 判断改支付是否为团购支付
    // 团购支付,创建拼单订单
    const orderRes = await Global.collection('CashTransaction').findOne({
        transRecordId: call.req.orderId,
        userId: call.currentUser.userId,
        state: true
    })

    if (!orderRes) {
        return call.error('支付异常~')
    }

    if (orderRes.type === 'group') {
        const groupRes = await Global.collection('GroupRecords').findOne({
            createUserId: call.currentUser.userId,
            mainClassId: orderRes.mainClassId,
            ownerOrderId: orderRes.transRecordId
        })

        if (!groupRes) {
            return call.error('团购订单异常~')
        }

        return call.succ({
            groupId: groupRes._id.toHexString()
        })
    } else if (orderRes.type === 'join') {
        return call.succ({
            groupId: orderRes.groupOrderId
        })
    }

}