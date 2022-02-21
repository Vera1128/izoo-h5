import rpcClient from './apiClient'
import * as scheme from '../schemes/index'

// 提交订单
export async function createOrder(createOrder: scheme.ReqCreateOrder) {
  const res = await rpcClient.callApi('Order/CreateOrder', createOrder)
  return res
}

export default {
  createOrder,
}
