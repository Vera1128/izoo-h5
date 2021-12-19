import rpcClient from './apiClient'

// 获取详细信息
export async function getDetailInfo(mainClassId: string) {
  const res = await rpcClient.callApi('Detail/MainDetail', {
    mainClassId,
  })
  return res
}

// 更改收藏状态
export async function changeCollectStatus(id: string) {
  const res = await rpcClient.callApi('Detail/CollectEvent', { mainClassId: id })
  return res
}

export default {
  getDetailInfo,
  changeCollectStatus,
}
