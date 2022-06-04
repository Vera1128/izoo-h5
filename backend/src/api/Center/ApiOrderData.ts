import moment from "moment";
import { ObjectId } from "mongodb";
import { customAlphabet } from "nanoid";
import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import Cash from "../../models/Payment/Cash";
import { orderDataItem, ReqOrderData, ResOrderData } from "../../shared/protocols/Center/PtlOrderData";

export async function ApiOrderData(call: ApiCall<ReqOrderData, ResOrderData>) {

    Global.collection('GroupRecords').find({ type: 'wait' }).toArray().then(res => {
        for (let i = 0;i < res.length;i++) {
            const item = res[i];
            if (item.endTime < moment().valueOf()) {
                Global.collection('GroupRecords').updateOne({
                    _id: item._id
                }, {
                    $set: {
                        state: 'fail'
                    }
                })

            }

        }
    })

    let list: orderDataItem[] = []

    let meOrder = await Global.collection('GroupRecords').find({ createUserId: call.currentUser.userId })
        .sort({ updateTime: -1 }).toArray()

    let joinOrder = await Global.collection('GroupRecords').find({ joinUserId: call.currentUser.userId })
        .sort({ updateTime: -1 }).toArray()

    let singleOrder = await Global.collection('CashTransaction').find({
        userId: call.currentUser.userId,
        type: 'single'
    }).sort({ updateTime: -1 }).toArray()

    for (let i = 0;i < singleOrder.length;i++) {
        const item = singleOrder[i];

        const contentRes = await Global.collection('ContentMainClass').findOne({
            _id: ObjectId.createFromHexString(item.mainClassId)
        })

        if (contentRes) {
            list.push({
                title: contentRes.title,
                desc: contentRes.desc,
                mainClassId: contentRes._id.toString(),
                imageUrl: contentRes.scrollImages.length > 0 ? contentRes.scrollImages[0] : '',
                amount: contentRes.amount,
                avgAmount: contentRes.avgAmount,
                orderId: item.transRecordId,
                groupId: '',
                createTime: item.createTime,
                state: item.state === true ? 'success' : 'fail',
                type: 'single'
            })
        }

    }

    const res = [...meOrder, ...joinOrder].sort((a, b) => a.updateTime - b.updateTime)


    for (let i = 0;i < res.length;i++) {
        const item = res[i];

        const contentRes = await Global.collection('ContentMainClass').findOne({
            _id: ObjectId.createFromHexString(item.mainClassId)
        })

        const orderRes = await Global.collection('CashTransaction').findOne({
            transRecordId: item.ownerOrderId
        })
        if (orderRes) {
            if (contentRes) {
                let state = item.endTime > moment().valueOf() ? item.state : 'fail'
                const obj: orderDataItem = {
                    title: contentRes.title,
                    desc: contentRes.desc,
                    mainClassId: contentRes._id.toString(),
                    imageUrl: contentRes.scrollImages.length > 0 ? contentRes.scrollImages[0] : '',
                    amount: contentRes.amount,
                    avgAmount: contentRes.avgAmount,
                    orderId: item.ownerOrderId,
                    groupId: item._id.toHexString(),
                    createTime: item.createTime,
                    state: state,
                    type: orderRes.type
                }
                if (state === 'fail') {
                    try {
                        // 判断是否已经退款
                        const cashRes = await Global.collection('CashTransaction').findOne({
                            groupOrderId: item._id.toHexString(),
                            type: 'refund',
                            state: true
                        })
                        if (!cashRes) {
                            await Cash.toRefund({
                                groupOrderId: item._id.toHexString(),
                                userId: call.currentUser.userId,
                                mainClassId: contentRes._id.toString(),
                                price: orderRes.price,
                                realIp: Global.realIp,
                                out_trade_no: orderRes.transRecordId
                            })
                        }

                    } catch (error) {
                        console.error('退款异常', error)
                    }
                }

                list.push(obj)
            }
        }
    }

    list = list.sort((a, b) => b.createTime - a.createTime)

    call.succ({ list: list })


}