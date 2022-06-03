import { CurrentUser } from "../../shared/protocols/models/CurrentUser";

export interface DbUser {
  /* id */
  _id: number,
  /* 注册时间 */
  createTime: number;
  /** 上次登录时间 */
  updateTime: number
  /** 用户信息 */
  info: Omit<CurrentUser, 'userId'>,
  auth: {
    access_token: string,
    expires_in: number,
    refresh_token: string,
    openid: string,
    scope: string
  }
}