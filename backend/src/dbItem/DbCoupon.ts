import { ObjectId } from "mongodb";

export interface DbCoupon {
  /** 优惠券唯一 id */
  _id: ObjectId,
  /** 优惠券名称 */
  name: string,
  /** 使用数 */
  useNum: number
  /** 优惠券总数 */
  total: number
  /** 有效时间
   * arr[0] => 开始时间
   * arr[1] => 失效时间
   */
  dateTime: string[],
  /** 当前优惠券状态 */
  state: boolean

}