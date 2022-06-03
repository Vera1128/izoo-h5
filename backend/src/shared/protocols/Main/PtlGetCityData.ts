
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";

/**
 * GetCityData 请求-[获取城市路线数据]
 */
export interface ReqGetCityData extends BaseRequest {

}

/**
 * GetCityData 返回-[获取城市路线数据]
 */
export interface ResGetCityData extends BaseResponse {
  list: cityItem[]
}

interface cityItem {
  /** 城市 */
  city: string,
  /** 海报图 */
  poster: string,
}

export const conf: BaseConf = {
  needLogin: true
}
