
import { BaseRequest, BaseResponse, BaseConf } from "./Base";

/**
 * ListenReport 请求-[收听内容信息上报]
 */
export interface ReqListenReport extends BaseRequest {
    /** 内容唯一主 id */
    mainClassId: string,
    /** 目录唯一 id */
    subId?: string,
    /** 收听时长 秒单位 */
    duration: number
}

/**
 * ListenReport 返回-[收听内容信息上报]
 */
export interface ResListenReport extends BaseResponse {

}

export const conf: BaseConf = {
    needLogin: true
} 
