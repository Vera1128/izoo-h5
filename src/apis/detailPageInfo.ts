import rpcClient from './apiClient'

// 获取详细信息
export async function getDetailInfo(mainClassId: string) {
  const res = await rpcClient.callApi('Detail/MainDetail', {
    mainClassId,
  })
  return res
}

export default {
  getDetailInfo,
}
