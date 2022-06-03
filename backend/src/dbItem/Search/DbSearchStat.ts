import { ObjectId } from "mongodb";

export interface DbSearchStat {
  _id: ObjectId,
  /** 类型 */
  type: 'self' | 'system'
  /** 搜索内容 */
  content: string,
  /** 搜索次数 */
  tiemes?: number,
  create?: {
    /** 创建时间 */
    createTime: Date,
    /** 更新时间 */
    updateTime: Date,
    /** 搜索人的 id */
    userId: number,
  }
}