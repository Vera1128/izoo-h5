import { ApiCall } from "tsrpc";
import { DbSearchStat } from "../dbItem/Search/DbSearchStat";
import { Global } from "../models/Global";
import { ReqSearchHistory, ResSearchHistory } from "../shared/protocols/PtlSearchHistory";

export async function ApiSearchHistory(call: ApiCall<ReqSearchHistory, ResSearchHistory>) {

    const action = call.req.action

    let historyRes: DbSearchStat[] = [];
    let hotRes: DbSearchStat[] = [];

    switch (action) {
        case 'get':
            
            historyRes = await Global.collection('SearchStat').find({
                type: 'self',
                'create.userId': call.currentUser.userId!
            }).limit(20).toArray()

            break;

        case 'clear':

            await Global.collection('SearchStat').updateMany({
                type: 'self',
                'create.userId': call.currentUser.userId
            }, {
                $set: {
                    isEnable: false
                }
            }, { upsert: true })

            break;

    }

    hotRes = await Global.collection('SearchStat').find({
        type: 'system'
    }).sort({ times: -1 }).limit(20).toArray()

    call.succ({
        history: historyRes.map((v) => {
            return v.content
        }),
        hot: hotRes.map((v) => {
            return v.content
        })
    })


}