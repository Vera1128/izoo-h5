
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";

/**
 * GetTagsData 请求-[获取主题配置]
 */
export interface ReqGetTagsData extends BaseRequest {

}

/**
 * GetTagsData 返回-[获取主题配置]
 */
export interface ResGetTagsData extends BaseResponse {
  list: tagsItem[]
}

interface tagsItem {
  /** 主题唯一 id */
  _id: string,
  /** 主题名称 */
  tag: string,
  /** 主图图片 */
  icon: string
}

export const conf: BaseConf = {
    needLogin: true
} 
