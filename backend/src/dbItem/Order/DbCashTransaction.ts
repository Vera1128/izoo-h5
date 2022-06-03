import { ObjectId } from "mongodb";

export interface DbCashTransaction {
  _id: ObjectId,
  /** 订单类型 */
  type: 'group' | 'single' | 'join',
  /** 团购订单的orderId */
  groupOrderId?: string,
  /** 用户唯一 id */
  userId: number,
  /** 景点内容唯一 id */
  mainClassId: string,
  /** 订单唯一 id  transRecordId <=> meta.orderId */
  transRecordId: string,
  /** 是否已经支付 */
  state: boolean,
  /** 支付状态 */
  meta: {
    [key: string]: any
  },
  /** 价格 */
  price: number,
  /** 预留电话 */
  phone?: number,
  /** 订单创建时间 */
  createTime: number,
  /** 更新时间 */
  updateTime: number
}