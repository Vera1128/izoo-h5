
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";

/**
 * GetScrollData 请求-[获取首页轮播图信息]
 */
export interface ReqGetScrollData extends BaseRequest {

}
/**
 * GetScrollData 返回-[获取首页轮播图信息]
 */
export interface ResGetScrollData extends BaseResponse {
    list: scrollItem[]
}

interface scrollItem {
    /* 内容唯一 id */
    mainClassId: string,
    /* 轮播图 */
    scrollImg: string,
}

export const conf: BaseConf = {
    needLogin: true
}
