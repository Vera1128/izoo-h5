/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2021-12-20 10:24:44
 * @LastEditTime: 2021-12-22 18:02:25
 */
import rpcClient from './apiClient'

// 获取用户收藏列表
export async function getFavoritesList() {
  const res = await rpcClient.callApi('Center/FavoritesData', {})
  return res
}

// 获取收听列表
export async function getListenList() {
  const res = await rpcClient.callApi('Center/ListenData', {})
  return res
}

// 获取订单列表
// export async function getOrderList() {
//   const res = await rpcClient.callApi('Center/OrderData', {})
//   return res
// }

// 更改收藏状态
export async function changeCollectStatus(id: string) {
  const res = await rpcClient.callApi('Detail/CollectEvent', { mainClassId: id })
  return res
}

export default {
  getFavoritesList,
  getListenList,
  changeCollectStatus,
}
