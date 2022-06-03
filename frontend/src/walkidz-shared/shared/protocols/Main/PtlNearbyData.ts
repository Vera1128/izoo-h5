
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";
import { populerItem } from "./PtlGetPopulerData";

/**
 * GetScrollData 请求-[获取附近的内容数据]
 */
export interface ReqNearbyData extends BaseRequest {
  /** 经度 */
  longitude: string
  /** 纬度 */
  latitude: string
}
/**
 * GetScrollData 返回-[获取附近的内容数据]
 */
export interface ResNearbyData extends BaseResponse {
  list: populerItem[]
}

export const conf: BaseConf = {
  needLogin: true
}
