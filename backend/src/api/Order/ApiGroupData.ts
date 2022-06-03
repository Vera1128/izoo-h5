import moment from "moment";
import { ObjectId } from "mongodb";
import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { ReqGroupData, ResGroupData } from "../../shared/protocols/Order/PtlGroupData";

export async function ApiGroupData(call: ApiCall<ReqGroupData, ResGroupData>) {

    let type: ResGroupData['type'] = 'wait';

    let groupOrderRes = await Global.collection('GroupRecords').findOne({
        _id: ObjectId.createFromHexString(call.req.groupId)
    })

    if (!groupOrderRes) {
        return call.error('团购订单为 null')
    }

    let mainClassRes = await Global.collection('ContentMainClass').findOne({
        _id: ObjectId.createFromHexString(groupOrderRes.mainClassId),
        isDel: false,
        state: true,
    })

    if (!mainClassRes) {
        return call.error('景点内容为 null')
    }

    if (groupOrderRes.state === 'success') {
        type = 'overload'
    } else if (groupOrderRes.endTime < moment().valueOf()) {

        Global.collection('GroupRecords').updateOne({
            _id: ObjectId.createFromHexString(call.req.groupId)
        }, {
            $set: {
                state: 'fail'
            }
        })

        type = 'failed'
    }
    if (groupOrderRes.state === 'success' && call.currentUser.userId !== groupOrderRes.joinUserId && call.currentUser.userId !== groupOrderRes.createUserId) {
        type = 'create'
    } else if (groupOrderRes.state === 'success') {
        type = 'success'
    }

    if (type === 'wait') {
        if (call.currentUser.userId !== groupOrderRes.createUserId) {
            type = 'join'
        }
    }


    for (let i = 0;i < mainClassRes.tags.length;i++) {
        const tagsId = mainClassRes.tags[i];
        let result = await Global.collection('Tags').findOne({
            _id: tagsId
        })

        mainClassRes.tags[i] = result ? result.tag : ''
    }

    let duration = await Global.collection('ContentValueClass').aggregate([
        {
            $match: {
                mainClassId: groupOrderRes.mainClassId
            }
        },
        {
            $group: {
                _id: '$mainClassId',
                duration: {
                    $sum: '$duration'
                }
            }
        }
    ]).toArray()


    let subRes = await Global.collection('ContentSubClass').findOne({
        mainClassId: groupOrderRes.mainClassId
    })

    let ownerUserInfo = await Global.collection('User').findOne({
        _id: groupOrderRes.createUserId
    })

    if (!ownerUserInfo) {
        return call.error('UserInfo is null userId:' + groupOrderRes.createUserId)
    }


    let joinUserInfo = await Global.collection('User').findOne({
        _id: groupOrderRes.joinUserId
    })

    call.succ({
        mainClassInfo: {
            mainClassId: groupOrderRes.mainClassId,
            title: mainClassRes.title,
            tags: mainClassRes.tags,
            duration: duration && duration.length > 0 ? duration[0].duration : 0,
            totals: subRes ? subRes.subClassList.length : 0,
            amount: mainClassRes.amount,
            avgAmount: mainClassRes.avgAmount,
        },
        ownerAvatar: ownerUserInfo.info.avatar,
        joinAvatar: joinUserInfo ? joinUserInfo.info.avatar : undefined,
        type: type,
        endTime: groupOrderRes.endTime
    })

}