import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { ReqTypeList, ResTypeList } from "../../shared/protocols/List/PtlTypeList";

export async function ApiTypeList(call: ApiCall<ReqTypeList, ResTypeList>) {

    let arr: ResTypeList['list'] = [] as any;

    const type = call.req.type

    switch (type) {

        case 'city':

            const cityRes = await Global.collection('MainCityPoster').find({
                state: true,
            }).sort({ sortId: 1 }).toArray()

            let newArr: { nums: number, city: string }[] = [] as any
            for (let i = 0;i < cityRes.length;i++) {
                const item = cityRes[i];
                let nums = await Global.collection('ContentMainClass').count({ isDel: false, state: true, city: item.city })
                newArr.push({
                    city: item.city,
                    nums: nums
                })
            }

            newArr = newArr.sort((a, b) => b.nums - a.nums)

            arr = newArr.map((v) => {
                return v.city
            })

            break;

        case 'tag':

            const tagRes = await Global.collection('Tags').find({

            }).sort({ updateTime: 1 }).toArray()

            arr = tagRes.map((v) => {
                return v.tag
            })

            break;

    }

    call.succ({
        list: arr
    })

}