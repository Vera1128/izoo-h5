import { ObjectId } from "mongodb";
import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { ReqSubDetail, ResSubDetail } from "../../shared/protocols/Detail/PtlSubDetail";

export async function ApiSubDetail(call: ApiCall<ReqSubDetail, ResSubDetail>) {


    let mainClassRes = await Global.collection('ContentMainClass').find({
        _id: ObjectId.createFromHexString(call.req.mainClassId),
        isDel: false,
    }).project({ title: 1, address: 1, isCharge: 1 }).next()

    if (!mainClassRes) {
        return call.error('mainclass is null')
    }

    // 检测是否收费
    if (mainClassRes.isCharge) {
        // 检测是否已经付款
        const isPay = await Global.collection('CashTransaction').findOne({
            mainClassId: call.req.mainClassId,
            userId: call.currentUser.userId,
            'meta.result_code': 'SUCCESS'
        })

        if(!isPay) {
            return call.error('无法使用,请先购买~')
        }

    }

    let subValueRes = await Global.collection('ContentValueClass').find({
        mainClassId: call.req.mainClassId,
        subClassId: call.req.subId
    }).next()

    if (!subValueRes) {
        return call.error('subValue is null')
    }

    let subTypeRes = await Global.collection('ContentSubClass').findOne({
        mainClassId: call.req.mainClassId,
    })

    if (!subTypeRes) {
        return call.error('subType is null!!!')
    }

    let subTitle = subTypeRes.subClassList.find((v: any) => v.subId === call.req.subId)

    call.succ({
        title: mainClassRes.title,
        address: subValueRes.address ? subValueRes.address : '',
        subTitle: subTitle ? subTitle.title : '',
        imagesList: subValueRes.imagesList,
        videosList: subValueRes.videosList,
        extraImagesList: subValueRes.footerImages || []
    })


}