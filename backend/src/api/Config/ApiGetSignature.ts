import { ApiCall, HttpConnection } from "tsrpc";
import { BackConfig } from "../../configs/BackConfig";
import { WeChatUtil } from "../../models/WeChatUtil";
import { ReqGetSignature, ResGetSignature } from "../../shared/protocols/Config/PtlGetSignature";

export async function ApiGetSignature(call: ApiCall<ReqGetSignature, ResGetSignature>) {

    /**
     * 签名算法
     */
    let signature = await WeChatUtil.signatureAction(call.req.url, call.logger)

    if (signature.errcode) {
        call.error('获取签名失败， Error: ' + signature.errmsg)!  
        return
    }

    call.succ({
        appId: BackConfig.WeChatConfig.appId,
        timestamp: signature.timestamp!,
        nonceStr: signature.noncestr!,
        signature: signature.signature!,
        jsApiList: [
            'getLocation',
            'chooseWXPay'
        ]

    })

}