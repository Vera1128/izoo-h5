
import { BaseRequest, BaseResponse, BaseConf } from "./Base";
import { ResCreateOrder } from "./Order/PtlCreateOrder";

/**
 * DebugPay 请求-[测试支付]
 */
export interface ReqDebugPay extends BaseRequest {
}

/**
 * DebugPay 返回-[测试支付]
 */
export type ResDebugPay = ResCreateOrder 

export const conf: BaseConf = {
  needLogin: true
} 
