
import { CurrentUser } from "../models/CurrentUser";
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";

/**
 * Login 请求-[正式服登录]
 */
export interface ReqLogin extends BaseRequest {
    /** 客户端重定向code */
    code: string
}
/**
 * Login 返回-[正式服登录]
 */
export interface ResLogin extends BaseResponse {
    info: (CurrentUser & { userId: number })
}

export const conf: BaseConf = {
    needLogin: false
}
