
import { BaseRequest, BaseResponse, BaseConf } from "./Base";

/**
 * SearchHistory 请求-[搜索记录]
 */
export interface ReqSearchHistory extends BaseRequest {
  action: 'get' | 'clear'
}

/**
 * SearchHistory 返回-[搜索记录]
 */
export interface ResSearchHistory extends BaseResponse {
  history: string[],
  hot: string[]
}


export const conf: BaseConf = {
    needLogin: true
} 
