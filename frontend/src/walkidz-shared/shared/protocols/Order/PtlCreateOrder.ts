
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";

/**
 * CreateOrder 请求-[提交支付订单]
 */
export interface ReqCreateOrder extends BaseRequest {
  /** 
   * type: 订单类型
   * group: 团购
   * single: 单买
   * join: 加入团购
   */
  type: 'group' | 'single' | 'join',
  /**
   * 景点唯一 id
   */
  mainClassId: string,
  /**
   * 手机号
   */
  phone?: number
  /**
   * 团购订单的唯一orderId type === join 时携带
   */
  groupOrderId?: string

}

/**
 * CreateOrder 返回-[提交支付订单]
 */
export interface ResCreateOrder extends BaseResponse {
  /** 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符 */
  timestamp: number,
  /** 微信支付V3的传入RSA,微信支付V2的传入格式与V2统一下单的签名格式保持一致 */
  signType: string,
  /** 
   * 公众号ID，由商户传入
   */
  appId: string,
  /**
   * 随机串
   */
  nonceStr: string,
  /**
   * JSAPI下单接口返回的prepay_id参数值
   */
  prepay_id: string,
  /**
   * 签名
   */
  paySign: string,
  /**
   * 唯一订单 id
   */
  orderId: string
}

export const conf: BaseConf = {
  needLogin: true
} 
