import moment from "moment";
import { ObjectId } from "mongodb";
import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { orderDataItem, ReqOrderData, ResOrderData } from "../../shared/protocols/Center/PtlOrderData";

export async function ApiOrderData(call: ApiCall<ReqOrderData, ResOrderData>) {

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
                let state = moment(item.createTime).add(1, 'days').valueOf() > moment().valueOf() ? item.state : 'fail'
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
                    state:  state,
                    type: orderRes.type
                }
                list.push(obj)
            }
        }
    }

    list = list.sort((a, b) => b.createTime - a.createTime)

    call.succ({ list: list })


}