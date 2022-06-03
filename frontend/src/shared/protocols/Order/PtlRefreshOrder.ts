
import { BaseRequest, BaseResponse, BaseConf } from "../Base";

/**
 * RefreshOrder 请求-[刷新获取支付订单的数据, 判断是否支付,返回团购唯一 id]
 */
export interface ReqRefreshOrder extends BaseRequest {
  /** 订单id */
  orderId: string,
}

/**
 * RefreshOrder 返回-[刷新获取支付订单的数据, 判断是否支付,返回团购唯一 id]
 */
export interface ResRefreshOrder extends BaseResponse {
  /** 
   * 团购 id 
   * 仅团购订单存在.
   * 通过团购 id 进行参团的分享
   */
  groupId?: string
}

export const conf: BaseConf = {
  needLogin: true
} 
