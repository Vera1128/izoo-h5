import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { ListUtil } from "../../models/ListUtil";
import { ReqTypeData, ResTypeData } from "../../shared/protocols/List/PtlTypeData";

export async function ApiTypeData(call: ApiCall<ReqTypeData, ResTypeData>) {

    const type = call.req.type;
    const value = call.req.value;

    let arr: ResTypeData['list'] = [] as any

    switch (type) {

        case 'city':

            let cityRes = await Global.collection('ContentMainClass').find({
                city: value,
                isDel: false,
                state: true,
            }).project({ city: 1, address: 1, title: 1, desc: 1, tags: 1, scrollImages: 1 }).toArray()

            if (cityRes.length > 0) {

                arr = await ListUtil.listDataEvent(cityRes, arr)

            }

            break;


        case 'tag':

            let tagRes = await Global.collection('Tags').findOne({
                tag: value
            })

            if (tagRes) {
                const tagsId = tagRes._id;

                let mainClassRes = await Global.collection('ContentMainClass').find({
                    tags: {
                        $in: [tagsId]
                    },
                    isDel: false,
                    state: true,
                }).toArray()

                if (mainClassRes.length > 0) {

                    arr = await ListUtil.listDataEvent(mainClassRes, arr)

                }
            }

            break;

    }

    call.succ({
        list: arr
    })


}
