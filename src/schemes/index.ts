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
