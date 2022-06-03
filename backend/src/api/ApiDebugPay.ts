import moment from "moment";
import { ApiCall } from "tsrpc";
import { BackConfig } from "../configs/BackConfig";
import { Global } from "../models/Global";
import Cash from "../models/Payment/Cash";
import { ReqDebugPay, ResDebugPay } from "../shared/protocols/PtlDebugPay";

export async function ApiDebugPay(call: ApiCall<ReqDebugPay, ResDebugPay>) {

    const result = await Cash.toPays({
        type: 'group',
        userId: call.currentUser.userId,
        mainClassId: '618a9c920109e1ce065e5896',
        price: 0.1,
        realIp: Global.realIp,
        phone: 18610376107  // 测试用
    })


    call.succ({
        orderId: result.orderId!,
        timestamp: moment().unix().valueOf(),
        signType: 'MD5',
        appId: BackConfig.WXPAY.appid,
        nonceStr: result.nonce_str!,
        prepay_id: 'prepay_id=' + result.prepay_id!,
        paySign: result.sign!
    })

}