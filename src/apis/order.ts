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

// 刷新订单状态
export async function refreshOrder(orderId: string) {
  const res = await rpcClient.callApi('Order/RefreshOrder', { orderId })
  return res
}

export default {
  createOrder,
  getGroupData,
  refreshOrder,
}
