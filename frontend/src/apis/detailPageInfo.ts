import statUtil from 'src/utils/statUtil'
import rpcClient from './apiClient'

// 获取详细信息
export async function getDetailInfo(mainClassId: string) {
  const res = await rpcClient.callApi('Detail/MainDetail', {
    mainClassId,
  })
  return res
}

// 获取目录列表
export async function getCatalogList(mainClassId: string) {
  const res = await rpcClient.callApi('Detail/CatalogList', {
    mainClassId,
  })
  return res
}

// 获取景点收听页信息
export async function getSubDetail({ mainClassId, subId }) {
  const res = await rpcClient.callApi('Detail/SubDetail', {
    mainClassId,
    subId,
  })
  return res
}

// 更改收藏状态
export async function changeCollectStatus(id: string) {
  const res = await rpcClient.callApi('Detail/CollectEvent', { mainClassId: id })
  if (res.isSucc) {
    await statUtil.report('收藏', { state: res.res.state })
  }
  return res
}

// 收听内容信息上报
export async function listenReport(mainClassId: string, subId: string, duration: number) {
  const res = await rpcClient.callApi('ListenReport', { mainClassId, subId, duration })
  await statUtil.report('收听内容', { mainClassId, subId, duration })
  return res
}

export default {
  getDetailInfo,
  getCatalogList,
  getSubDetail,
  changeCollectStatus,
  listenReport,
}
