import { ObjectId } from 'mongodb'

export interface DbListenReport {
  /* id */
  _id: ObjectId,
  /** 用户唯一 uid */
  userId: number,
  /** 景点内容唯一 id */
  mainClassId: string,
  /** 目录唯一 id */
  subId?: string,
  /** 收听时长 */
  duration: number,
  /** 更新时间 */
  updateTime: Date,  
}