import { ApiCall } from "tsrpc";
import { BackConfig } from "../../configs/BackConfig";
import { Global } from "../../models/Global";
import { MainUtil } from "../../models/MainUtil";
import { populerItem } from "../../shared/protocols/Main/PtlGetPopulerData";
import { ReqNearbyData, ResNearbyData } from "../../shared/protocols/Main/PtlNearbyData";

export async function ApiNearbyData(call: ApiCall<ReqNearbyData, ResNearbyData>) {

    let arr: populerItem[] = [] as any;

    let local = 'local'

    // set local
    await Global.redis.geoadd(BackConfig.Geo.key, Number(call.req.longitude), Number(call.req.latitude), local)

    // get
    let result = await Global.redis.georadius(BackConfig.Geo.key, Number(call.req.longitude), Number(call.req.latitude), BackConfig.Geo.radius, 'km', 'DESC')

    let mainClassData = await Global.collection('ContentMainClass').find({
        title: {
            $in: result
        },
        state: true,
        isDel: false,
    }).toArray()

    arr = await MainUtil.mainClassDataEvent(mainClassData, arr)

    // get distance
    let tmpFunc = [];
    for (let i = 0;i < arr.length;i++) {
        const item = arr[i];
        const value = item.title;

        tmpFunc.push(new Promise(async (rs, rj) => {
            try {
                const result = await Global.redis.geodist(BackConfig.Geo.key, local, value, 'km')
                if (result) {
                    arr[i].distance = Number(result)
                    rs(result)
                    return
                }
            } catch (error) {
                rj(error)
                return
            }
        }))

    }
    await Promise.all(tmpFunc)

    await Global.redis.zrem(BackConfig.Geo.key, local)

    call.succ({
        list: arr
    })

}