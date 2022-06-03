import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { catalogListItem, ReqCatalogList, ResCatalogList } from "../../shared/protocols/Detail/PtlCatalogList";

export async function ApiCatalogList(call: ApiCall<ReqCatalogList, ResCatalogList>) {

    let subRes = await Global.collection('ContentSubClass').findOne({
        mainClassId: call.req.mainClassId
    })

    let arr: catalogListItem[] = [] as any;

    if (subRes) {
        let subClassIds: string[] = subRes.subClassList.map((item: Pick<catalogListItem, 'subId' | 'title'>) => {
            return item.subId
        })
        let valueRes = await Global.collection('ContentValueClass').find({
            mainClassId: call.req.mainClassId,
            subClassId: {
                $in: subClassIds
            }
        }).toArray()

        arr = subRes.subClassList.map((item: Pick<catalogListItem, 'subId' | 'title'>) => {
            let info = valueRes.find(v => v.subClassId === item.subId)

            let obj: catalogListItem = {
                subId: item.subId,
                title: item.title,
                iconUri: info && info.imagesList.length > 0 ? info.imagesList[0] : '',
                isAudition: info ? info.isAudition : false,
                audioUri: info && info.videosList.length > 0 ? info.videosList[0] : '',
                duration: info ? info.duration : 0

            }

            return obj

        })



    }

    call.succ({ list: arr })

}