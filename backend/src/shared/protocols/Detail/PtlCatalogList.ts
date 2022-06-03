
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";

/**
 * CatalogList 请求-[获取目录]
 */
export interface ReqCatalogList extends BaseRequest {
  /** 内容唯一 id */
  mainClassId: string
}

/**
 * CatalogList 返回-[获取目录]
 */
export interface ResCatalogList extends BaseResponse {
  list: catalogListItem[]
}

export interface catalogListItem {
  /** 目录唯一 id */
  subId: string
  /** 目录名称 */
  title: string
  /** 目录 icon */
  iconUri: string,
  /** 是否开启试听 true: 开启, false: 关闭 */
  isAudition?: boolean
  /** 音频地址 */
  audioUri?: string,
  /** 时长 */
  duration?: number
}
export const conf: BaseConf = {
  needLogin: true
} 
