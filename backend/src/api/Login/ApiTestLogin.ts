import { ApiCall } from "tsrpc";
import { createSSO } from "../../models/flow/useSSOLogic";
import { UserUtil } from "../../models/UserUtil";
import { accessTokenItem, WeChatUtil } from "../../models/WeChatUtil";
import { ReqTestLogin, ResTestLogin } from "../../shared/protocols/Login/PtlTestLogin";

export async function ApiTestLogin(call: ApiCall<ReqTestLogin, ResTestLogin>) {

    let ret: accessTokenItem = {
        access_token: '',
        expires_in: 0,
        refresh_token: '',
        openid: '',
        scope: '',
    }


    /**
     * 获取用户昵称头像等信息
     */

    const userInfo = await UserUtil.getUserInfo(call.req.userId)

    if (!userInfo) {
        return call.error('用户信息异常!')
    }

    const sso = createSSO(call.req.userId)

    call.succ({
        sso: sso,
        info: {
            nickName: userInfo.info.nickName,
            avatar: userInfo.info.avatar,
            gender: userInfo.info.gender,
            province: userInfo.info.province,
            city: userInfo.info.city,
            country: userInfo.info.country
        }
    })

}