import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { ReqGetScrollData, ResGetScrollData } from "../../shared/protocols/Main/PtlGetScrollData";

export async function ApiGetScrollData(call: ApiCall<ReqGetScrollData, ResGetScrollData>) {

    let result = await Global.collection('MainScroll').find({
        state: true
    }).sort({ sortId: 1 }).toArray()


    call.succ({
        list: result.map((v) => {
            return {
                mainClassId: v.mainClassId,
                scrollImg: v.scrollImg
            }
        })
    })

}