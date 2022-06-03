
import { populerItem } from "../Main/PtlGetPopulerData";
import { BaseRequest, BaseResponse, BaseConf } from "./../Base";

/**
 * GroupData 请求-[个人中心-获取团购订单数据]
 */
export interface ReqGroupData extends BaseRequest {
  /** 团购唯一 id */
  groupId: string
}

/**
 * GroupData 返回-[个人中心-获取团购订单数据]
 */
export interface ResGroupData extends BaseResponse {
  mainClassInfo: Pick<populerItem, 'mainClassId' | 'title' | 'tags' | 'duration' | 'totals'> & {
    /** 金额 */
    amount: number;
    /** 拼团金额 */
    avgAmount: number;
  },
  /** 团长头像 */
  ownerAvatar: string,
  /** 参与者头像 */
  joinAvatar?: string,
  /** 
   * 团购订单状态
   * wait: 等待中,待参与团购 [自己二次进入后的状态]
   * join: 加入团购 [邀请者加入的状态]
   * failed: 团购订单失败,到期并无人参与 [所有人进入后的状态]
   * overload: 满额,团购成功 [ 自己和参与者进入后状态 ]
   * success: 团购成功 [ 参与者进入后的状态 ]
   * create: 发起团购 [第三则进入后状态]
   */
  type: 'wait' | 'join' | 'failed' | 'success' | 'overload' | 'create',
  /** 团购订单结束时间 */
  endTime: number,
}

export const conf: BaseConf = {
  needLogin: true
} 
