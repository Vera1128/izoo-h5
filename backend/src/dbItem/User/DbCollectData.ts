import { ObjectId } from "mongodb";

export interface DbCollectData {
  /** 唯一 id */
  _id: ObjectId,
  /** 用户唯一 uid */
  userId: number,
  /** 景点内容唯一 id */
  mainClassId: string,
  /** 状态 */
  state: boolean,
  /** 更新时间 */
  updateTime: Date
}