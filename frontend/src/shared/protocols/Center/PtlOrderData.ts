
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";

/**
 * OrderData 请求-[用户支付订单数据]
 */
export interface ReqOrderData extends BaseRequest {

}

/**
 * OrderData 返回-[用户支付订单数据]
 */
export interface ResOrderData extends BaseResponse {
  list: orderDataItem[]
}

export interface orderDataItem {
  /** 景点名称 */
  title: string,
  /** 景点描述 */
  desc: string,
  /** 内容唯一 id */
  mainClassId: string
  /** 景点icon */
  imageUrl: string,
  /** 单买价格 */
  amount: number,
  /** 团购价格 */
  avgAmount: number,
  /** 当前用户的支付订单orderId */
  orderId: string,
  /** 团购唯一订单id */
  groupId: string,
  /** 订单创建时间 */
  createTime: number,
  /** 
   * 购买状态 
   * success: 成功
   * fail: 失败
   * wait: 等待中
   */
  state: 'success' | 'fail' | 'wait',
  /** 订单类型 */
  type: 'group' | 'single' | 'join' | 'refund'
}

export const conf: BaseConf = {
  needLogin: true
} 
