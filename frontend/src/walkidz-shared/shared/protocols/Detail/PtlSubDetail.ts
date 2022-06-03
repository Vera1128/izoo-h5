
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";

/**
 * SubDetail 请求-[进入景点收听页]
 */
export interface ReqSubDetail extends BaseRequest {
  /** 景点内容唯一 id */
  mainClassId: string,
  /** 子目录内容唯一 id */
  subId: string
}

/**
 * SubDetail 返回-[进入景点收听页]
 */
export interface ResSubDetail extends BaseResponse {
  /** 景点标题 */
  title: string,
  /** 景点位置 */
  address: string,
  /** 目录名称 */
  subTitle: string,
  /** 轮播图 */
  imagesList: string[],
  /** 音频文件 */
  videosList: string[]
  /** 额外图片 */
  extraImagesList: string[]
}

export const conf: BaseConf = {
  needLogin: true
} 
