import { ObjectId } from 'mongodb'

export type DbMainScroll = {
  /** 唯一 id */
  _id: ObjectId,
  /* 文章主id */
  mainClassId: string,
  /* 轮播图 */
  scrollImg: string,
  /* 是否开启 */
  state: boolean,
  updateTime: string
}