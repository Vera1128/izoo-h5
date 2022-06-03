import { ObjectId } from "mongodb";

export interface DbStatHistory {
  _id: ObjectId,

  /** 记录时间 */
  time: Date
  /** 拓展数据 */
  [key: string]: any
  /** 创建时间 */
  createTime: Date,
  /** 更新时间 */
  updateTime: Date
}