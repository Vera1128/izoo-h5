import { ApiCall } from "tsrpc";
import { UserUtil } from "../../models/UserUtil";
import { ReqCurrentUser, ResCurrentUser } from "../../shared/protocols/Login/PtlCurrentUser";

export async function ApiCurrentUser(call: ApiCall<ReqCurrentUser, ResCurrentUser>) {

    const userInfo = await UserUtil.getUserInfo(call.currentUser.userId)

    if (!userInfo) {
        return call.error('用户信息异常!')
    }

    return call.succ({
        info: {
            ...userInfo.info,
            uid: call.currentUser.userId
        } 
    })

}