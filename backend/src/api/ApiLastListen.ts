import { ApiCall } from "tsrpc";
import { Global } from "../models/Global";
import { ReqLastListen, ResLastListen } from "../shared/protocols/PtlLastListen";

export async function ApiLastListen(call: ApiCall<ReqLastListen, ResLastListen>) {

    const result = await Global.collection('ListenReport').find({})
        .sort({ updateTime: -1 }).next()

    if(result) {
        call.succ({
            mainClassId: result.mainClassId,
            subId: result.subId
        }) 
    }else {
        call.succ({})
    }

}