
import { CurrentUser } from "../models/CurrentUser";
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";

/**
 * Login 请求-[测试登录]
 */
export interface ReqTestLogin extends BaseRequest {
  userId: number
}
/**
 * Login 返回-[测试登录]
 */
export interface ResTestLogin extends BaseResponse {
  info: CurrentUser
}

export const conf: BaseConf = {
  needLogin: false
}
