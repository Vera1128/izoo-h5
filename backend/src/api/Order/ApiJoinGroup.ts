import moment from "moment";
import { ObjectId } from "mongodb";
import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { ReqJoinGroup, ResJoinGroup } from "../../shared/protocols/Order/PtlJoinGroup";

export async function ApiJoinGroup(call: ApiCall<ReqJoinGroup, ResJoinGroup>) {
    
    try {

        await Global.collection('GroupRecords').findOneAndUpdate({
            _id: ObjectId.createFromHexString(call.req.groupId),
            state: 'wait'
        }, {
            $set: {
                joinUserId: call.currentUser.userId,
                state: 'success',
                updateTime: moment().valueOf()
            }
        })

    } catch (error) {
        throw new Error('JoinGroup Error' + JSON.stringify(error))
    }

    call.succ({

    })

}
