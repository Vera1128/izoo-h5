
import { populerItem } from "../Main/PtlGetPopulerData";
import { BaseRequest, BaseConf } from "./../Base";

/**
 * ListenData 请求-[获取个人中心收听记录]
 */
export interface ReqListenData extends BaseRequest {

}

/**
 * ListenData 返回-[获取个人中心收听记录]
 * 降序排列-最新靠前
 */
export type ResListenData = {
    list: listenItem[]
}

export type listenItem = (populerItem & { lastListenTime?: string })

export const conf: BaseConf = {
    needLogin: true
} 
