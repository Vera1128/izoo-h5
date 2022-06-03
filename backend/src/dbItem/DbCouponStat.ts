import { ObjectId } from "mongodb";

export interface DbCouponStat {
  _id: ObjectId;
  /** 优惠券 id */
  couponId: string,
  /** 用户唯一 id */
  uid: number,
  /** 优惠券发放时间 */
  createTime: Date,
  /** 使用时间 */
  useTime?: Date,
  /** 用户是否使用 */
  state: boolean
  /**
   * 景点唯一id
   */
  mainClassId?: string
}