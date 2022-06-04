
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";

/**
 * MainDetail 请求-[内容详情接口]
 */
export interface ReqMainDetail extends BaseRequest {
  /** 内容唯一 id */
  mainClassId: string
}

/**
 * MainDetail 返回-[内容详情接口]
 */
export interface ResMainDetail extends BaseResponse {
  /** 景点详情 */
  info: mainDetailItem
  /** 是否收藏 true: 已收藏 false: 未收藏 */
  isCollect: boolean
  /** 是否购买 
   * 够买状态:
   * true: 已购买
   * false: 未购买
   * wait: 待拼团中
  */
  isPayment: 'true' | 'false' | 'wait'
  /** 音频总时长 (单位 秒 -> 使用需转分钟) */
  duration: number
  /** 内容条数 */
  totals: number
}



export interface mainDetailItem {
  /** 名称 */
  title: string;
  /** 景点描述 */
  desc: string;
  /** 具体位置 */
  address: string;
  /** 运营时间 */
  time: string;
  /** 门票信息 */
  tickets: string;
  /** 标签 */
  tags: string[];
  /** 是否收费 */
  isCharge: boolean;
  /** 金额 */
  amount?: number;
  /** 拼团金额 */
  avgAmount?: number;
  /** 参与拼团人数 */
  nums?: number;
  /** 轮播图片 */
  scrollImages: string[];
  /** 内容简介 */
  content: string;
  /** 城市 */
  city: string
}

export const conf: BaseConf = {
  needLogin: true
}
