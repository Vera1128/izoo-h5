export interface CurrentUser {
  /** 昵称 */
  nickName: string,
  /** 头像 */
  avatar: string,
  /** 性别 */
  gender: number
  /** 电话 */
  phone?: number
  /** 省份 */
  province: string
  /** 城市 */
  city: string
  /** 国家 */
  country: string
}
