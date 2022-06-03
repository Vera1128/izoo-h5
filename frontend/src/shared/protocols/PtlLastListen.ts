
import { BaseRequest, BaseResponse, BaseConf } from "./Base";
import { ReqSubDetail } from "./Detail/PtlSubDetail";

/**
 * LastListen 请求-[获取上次收听的内容数据]
 */
export interface ReqLastListen extends BaseRequest {

}

/**
 * LastListen 返回-[获取上次收听的内容数据]
 */
export type ResLastListen = Pick<ReqSubDetail, 'mainClassId' | 'subId'> | {}

export const conf: BaseConf = {
  needLogin: true
} 
