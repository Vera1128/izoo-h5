import { ApiCall } from "tsrpc";
import { Global } from "../models/Global";
import { ReqListenReport, ResListenReport } from "../shared/protocols/PtlListenReport";

export async function ApiListenReport(call: ApiCall<ReqListenReport, ResListenReport>) {

    await Global.collection('ListenReport').findOneAndUpdate({
        userId: call.currentUser.userId,
        mainClassId: call.req.mainClassId,
        subId: call.req.subId,
    }, {
        $set: {
            duration: call.req.duration,
            updateTime: new Date()
        },
    }, {
        upsert: true,
        returnDocument: 'after'
    })

    call.succ({})

}