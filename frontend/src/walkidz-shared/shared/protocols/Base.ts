export interface BaseRequest {
  /** 登录态 */
  sso?: string;
}

export interface BaseResponse {
  /** 登录态 */
  sso?: string
}

export interface BaseConf {
  /** 如果为true，则该接口允许未登录访问 */
  needLogin?: boolean;
}
