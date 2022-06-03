/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2022-02-20 18:14:28
 * @LastEditTime: 2022-04-23 17:14:48
 */
import { ReqUseCoupon } from 'src/shared/protocols/Order/PtlUseCoupon'
import { ReqCreateOrder } from 'src/shared/protocols/Order/PtlCreateOrder'
import statUtil from 'src/utils/statUtil'
import rpcClient from './apiClient'

// 提交订单
export async function createOrder(req: ReqCreateOrder) {
  const res = await rpcClient.callApi('Order/CreateOrder', req)
  await statUtil.report('创建订单', { mainClassId: req.mainClassId, ...res })
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
  await statUtil.report('加入团购')
  return res
}

// 刷新订单状态
export async function refreshOrder(orderId: string) {
  const res = await rpcClient.callApi('Order/RefreshOrder', { orderId })
  await statUtil.report('支付成功', { orderId })
  return res
}
/**
 * 使用优惠券
 */
export async function couponAction(req: ReqUseCoupon) {
  const res = await rpcClient.callApi('Order/UseCoupon', req)
  await statUtil.report('使用优惠券')
  return res
}

export default {
  createOrder,
  getGroupData,
  refreshOrder,
  joinGroup,
  couponAction,
}
