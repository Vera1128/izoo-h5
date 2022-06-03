
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";


/**
 * GetPopulerData 请求-[获取热门数据]
 */
export interface ReqGetPopulerData extends BaseRequest {

}

/**
 * GetPopulerData  返回-[获取热门数据]
 */
export interface ResGetPopulerData extends BaseResponse {
  list: populerItem[]
}

export interface populerItem {
  /** 内容唯一 id */
  mainClassId: string,
  /** 标题 */
  title: string,
  /** 简介 */
  desc: string,
  /** 标签 */
  tags: string[],
  /** 音频总时长 (单位 秒 -> 使用需转分钟) */
  duration: number
  /** 内容条数 */
  totals: number
  /** 内容图片 */
  scrollImage: string,
  /** 距离 */
  distance?: number
}


export const conf: BaseConf = {
  needLogin: true
}
