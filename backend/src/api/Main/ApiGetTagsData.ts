import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { ReqGetTagsData, ResGetTagsData } from "../../shared/protocols/Main/PtlGetTagsData";

export async function ApiGetTagsData(call: ApiCall<ReqGetTagsData, ResGetTagsData>) {
    let result = await Global.collection('Tags').find({})
        .sort({ updateTime: 1 }).toArray()

    call.succ({
        list: result.map((v) => {
            return {
                _id: v._id,
                tag: v.tag,
                icon: v.icon
            }
        })
    })

}