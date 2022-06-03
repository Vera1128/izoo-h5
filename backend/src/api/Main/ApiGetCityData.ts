import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { ReqGetCityData, ResGetCityData } from "../../shared/protocols/Main/PtlGetCityData";

export async function ApiGetCityData(call: ApiCall<ReqGetCityData, ResGetCityData>) {

    let result = await Global.collection('MainCityPoster').find({
        state: true,
    }).sort({ sortId: 1 }).toArray()

    call.succ({
        list: result.map((v) => {
            return {
                city: v.city,
                poster: v.poster
            }
        })
    })

}