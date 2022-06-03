import { ObjectId } from "mongodb";

export interface DbGroupRecords {
  /** 唯一 id */
  _id: ObjectId,
  /** 团长订单唯一 id */
  ownerOrderId: string,
  /** 景点内容 */
  mainClassId: string,
  /** 创建团购人唯一 userId */
  createUserId: number,
  /** 加入团购人唯一 userId */
  joinUserId?: number,
  /** 
   * 购买状态 
   * success: 成功
   * fail: 失败
   * wait: 等待中
   */
  state: 'success' | 'fail' | 'wait',
  /** 创建时间 */
  createTime: number,
  /** 团购结束时间 */
  endTime: number,
  /** 更新时间 */
  updateTime: number,
}