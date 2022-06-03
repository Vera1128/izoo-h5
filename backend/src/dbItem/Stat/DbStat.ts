export interface DbStat {
  _id: string,
  /** 次数 */
  pv: number,
  /** 人数 */
  uv: number
  /** 额外数据 */
  data?: {
    /** 拓展数据 */
    [key: string]: any
  }
  /** 按天记录(年月日) YYYY-MM-DD */
  date: string

  /** 创建时间 */
  createTime: Date,
  /** 更新时间 */
  updateTime: Date
}