
import { BaseRequest, BaseResponse, BaseConf } from "./Base";

/**
 * Search 请求-[搜索接口]
 */
export interface ReqSearch extends BaseRequest {
    /** 搜索内容 */
    content: string
}

/**
 * Search 返回-[搜索接口]
 */
export interface ResSearch extends BaseResponse {
    list: searchItem[]
}

export interface searchItem {
    /** 内容唯一 id */
    mainClassId: string,
    /** 标题 */
    title: string,
    /** 详情 */
    desc: string,
    /** 图片 */
    scrollImage: string,
    /** 标签 */
    tags: string[],
    /** 城市 */
    city: string,
    
}

export const conf: BaseConf = {
    needLogin: true
}
