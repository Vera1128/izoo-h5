
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";

/**
 * ReportStat 请求-[日志数据上报]
 */
export interface ReqReportStat extends BaseRequest {
  /** 是否当日首次上报 true: 第一次  false: 已经不是第一次了 */
  isFirstDay: boolean
  /** 埋点行为 */
  action: string
  /** 拓展数据 (带规划) 例如: C端时长 */
  data?: { [key: string]: any }
}

/**
 * ReportStat 返回-[日志数据上报]
 */
export interface ResReportStat extends BaseResponse {

}

export const conf: BaseConf = {
  needLogin: true
} 
