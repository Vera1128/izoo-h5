
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";

/**
 * UseCoupon 请求-[使用优惠券]
 */
export interface ReqUseCoupon extends BaseRequest {
  /**
   * 景点唯一 id
   */
  mainClassId: string,
}

/**
 * UseCoupon 返回-[使用优惠券]
 */
export interface ResUseCoupon extends BaseResponse {

}

export const conf: BaseConf = {
  needLogin: true
} 
