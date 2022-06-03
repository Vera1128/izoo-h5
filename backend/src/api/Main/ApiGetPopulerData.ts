import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { MainUtil } from "../../models/MainUtil";
import { populerItem, ReqGetPopulerData, ResGetPopulerData } from "../../shared/protocols/Main/PtlGetPopulerData";

export async function ApiGetPopulerData(call: ApiCall<ReqGetPopulerData, ResGetPopulerData>) {

    let arr: populerItem[] = [] as any;

    let result = await Global.collection('ContentMainClass').find({
        populer: true,
        $where: 'this.scrollImages.length >= 1',
        state: true,
        isDel: false,
    }).sort({ updateTime: -1 }).project({ title: 1, desc: 1, tags: 1, scrollImages: 1 }).toArray()

    arr = await MainUtil.mainClassDataEvent(result, arr)

    let mainClassIds = []
    for (let i = 0;i < arr.length;i++) {
        const item = arr[i];
        mainClassIds.push(item.mainClassId)
    }

    let duration = await Global.collection('ContentValueClass').aggregate([
        {
            $match: {
                mainClassId: {
                    $in: mainClassIds
                }
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

    for (let i = 0;i < arr.length;i++) {
        const item = arr[i];

        let info = duration.find(v => v._id === item.mainClassId)

        if (info) {
            item.duration = info.duration
        }

    }

    call.succ({
        list: arr
    })

}