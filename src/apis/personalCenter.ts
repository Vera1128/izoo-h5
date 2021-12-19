import rpcClient from './apiClient'

// 获取用户收藏列表
export async function getFavoritesList() {
  const res = await rpcClient.callApi('Center/FavoritesData', {})
  return res
}

// 获取路线列表
export async function getListenList() {
  const res = await rpcClient.callApi('Center/ListenData', {})
  return res
}

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
