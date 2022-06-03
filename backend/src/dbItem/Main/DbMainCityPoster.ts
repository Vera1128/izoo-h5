import { ObjectId } from 'mongodb'

export type DbMainCityPoster = {
  _id: ObjectId,
  /** 城市 */
  city: string,
  /** 海报图 */
  poster: string,
  /** 是否开启 */
  state: boolean
  /** 权重 */
  weights: number
  /** 更新时间 */
  updateTime: string
}