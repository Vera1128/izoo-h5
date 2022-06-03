
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";

/**
 * CollectEvent 请求-[收藏内容]
 */
export interface ReqCollectEvent extends BaseRequest {
  /** 景点内容唯一 id */
  mainClassId: string
}

/**
 * CollectEvent 返回-[收藏内容]
 */
export interface ResCollectEvent extends BaseResponse {
  /** 收藏状态: true: 已收藏 false: 未收藏 */
  state: boolean
}

export const conf: BaseConf = {
    needLogin: true
} 
