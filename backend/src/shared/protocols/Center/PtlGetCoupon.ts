
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";

/**
 * GetCoupon 请求-[获取用户自己的优惠券数据]
 */
export interface ReqGetCoupon extends BaseRequest {

}

/**
 * GetCoupon 返回-[获取用户自己的优惠券数据]
 */
export interface ResGetCoupon extends BaseResponse {
  list: couponItem[]
}


export interface couponItem {
  /** 优惠券的唯一 id */
  couponId: string,
  /** 优惠券名称 */
  name: string,
  /** 
   * 优惠券的状态
   * expired: 过期
   * wait: 未使用
   * used: 已使用
   * */
  state: 'expired' | 'wait' | 'used',
  /** 开始时间 */
  sTime: string,
  /** 截止时间 */
  eTime: string
}

export const conf: BaseConf = {
  needLogin: true
} 
