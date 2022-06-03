
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";

/**
 * JoinGroup 请求-[加入团购]
 */
export interface ReqJoinGroup extends BaseRequest {
    groupId: string
}

/**
 * JoinGroup 返回-[加入团购]
 */
export interface ResJoinGroup extends BaseResponse {
    
}

export const conf: BaseConf = {
    needLogin: true
} 
