
import { CurrentUser } from "../models/CurrentUser";
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";

/**
 * CurrentUser 请求-[获取当前用户的信息]
 */
export interface ReqCurrentUser extends BaseRequest {

}

/**
 * CurrentUser 返回-[获取当前用户的信息]
 */
export interface ResCurrentUser extends BaseResponse {
    info: (CurrentUser & { uid: number })
}

export const conf: BaseConf = {
    needLogin: true
} 
