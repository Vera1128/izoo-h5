
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";

/**
 * TypeList 请求-[切换主题]
 */
export interface ReqTypeList extends BaseRequest {
  /** 切换主题 */
  type: 'city' | 'tag'
}

/**
 * TypeList 返回-[切换主题, 城市\标签]
 */
export interface ResTypeList extends BaseResponse {
  list: string[]
}

export const conf: BaseConf = {
  needLogin: true
}
