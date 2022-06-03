/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2021-11-30 19:50:37
 * @LastEditTime: 2022-03-19 12:35:33
 */
export interface NearbyParams {
  /** 经度 */
  longitude: string
  /** 纬度 */
  latitude: string
}

export interface RecommendItem {
  mainClassId: string
  title: string
  desc: string
  tags: Array<string>
  duration: number
  totals: number
  scrollImage: string
}

export interface ThemeListItem {
  _id: string
  tag: string
  icon: string
}

export type TypeListParams = 'city' | 'tag'

export type TypeDataParams = {
  type: 'city' | 'tag'
} & {
  value: string
}

export interface ReqCreateOrder {
  /**
   * type: 订单类型
   * group: 团购
   * single: 单买
   */
  type: 'group' | 'single'
  /** 景点唯一 id */
  mainClassId: string
  /** 用户唯一 id */
  userId?: string
}

export interface createOrderProps {
  reqOrder: ReqCreateOrder
  orderType: string
  paySuccess: (string) => void
  payCancel: () => void
  payFail: () => void
}
