import { ApiCall } from "tsrpc";
import { UserUtil } from "../../models/UserUtil";
import { WeChatUtil } from "../../models/WeChatUtil";
import { ReqLogin, ResLogin } from "../../shared/protocols/Login/PtlLogin";


export async function ApiLogin(call: ApiCall<ReqLogin, ResLogin>) {

    if (call.currentUser) {

        const userInfo = await UserUtil.getUserInfo(call.currentUser.userId)

        if (!userInfo) {
            return call.error('用户信息异常!')
        }

        return call.succ({
            info: userInfo.info
        })
    }


    /** 
     * 每次登录需授权获取openId
     */
    let getOpenAPIResult = await WeChatUtil.getOpenId(call.req.code, call.logger)

    if (getOpenAPIResult.errcode) {

        call.error(getOpenAPIResult.errmsg!)

        return

    }

    /**
     * 获取用户昵称头像等信息
     */

    let userInfo = await WeChatUtil.getUserInfo(getOpenAPIResult, call.logger)

    if (userInfo.errcode) {

        call.error(userInfo.errmsg!)

        return

    }

    userInfo.auth = getOpenAPIResult

    /**
     * userInfo -> DBUserInfo
     */
    let result = await UserUtil.userInfoEvent(userInfo, call.logger)

    if (!result) {
        return call.error('接口错误，请查看【userInfoEvent】')
    }

    call.succ({
        sso: result.sso,
        info: result.info
    });
}