/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2022-02-20 18:14:28
 * @LastEditTime: 2022-04-23 17:14:48
 */
import { ReqUseCoupon } from 'src/walkidz-shared/shared/protocols/Order/PtlUseCoupon'
import rpcClient from './apiClient'
import * as scheme from '../schemes/index'

// 提交订单
export async function createOrder(createOrder: scheme.ReqCreateOrder) {
  const res = await rpcClient.callApi('Order/CreateOrder', createOrder)
  return res
}

// 获取团购订单数据
export async function getGroupData(groupId: string) {
  const res = await rpcClient.callApi('Order/GroupData', { groupId })
  return res
}

// 加入团购
export async function joinGroup(groupId: string) {
  const res = await rpcClient.callApi('Order/JoinGroup', { groupId })
  return res
}

// 刷新订单状态
export async function refreshOrder(orderId: string) {
  const res = await rpcClient.callApi('Order/RefreshOrder', { orderId })
  return res
}
/**
 * 使用优惠券
 */
export async function couponAction(req: ReqUseCoupon) {
  const res = await rpcClient.callApi('Order/UseCoupon', req)
  return res
}

export default {
  createOrder,
  getGroupData,
  refreshOrder,
  joinGroup,
  couponAction,
}
