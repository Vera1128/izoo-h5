
import { BaseRequest, BaseResponse, BaseConf } from "../Base";

/**
 * GetSignature 请求-[获取 wx.config 的加密签名]
 */
export interface ReqGetSignature extends BaseRequest {
  /** 当前页面的地址， 不可保留#以后的数据 */
  url: string
}
/**
 * GetSignature 返回-[]
 */
export interface ResGetSignature extends BaseResponse {
  /** appId */
  appId: string,
  /** 时间戳 */
  timestamp: string,
  /** 随机数 */
  nonceStr: string,
  /** 加密签名 */
  signature: string,
  /** JS接口列表 */
  jsApiList: string[]
}

export const conf: BaseConf = {
  needLogin: true
}
