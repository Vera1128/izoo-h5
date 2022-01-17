import rpcClient from './apiClient'

// 获取请求记录
export async function getSearchHistory() {
  const res = await rpcClient.callApi('SearchHistory', {})
  return res
}

// 搜索
export async function search(content) {
  const res = await rpcClient.callApi('Search', { content })
  return res
}

export default {
  getSearchHistory,
  search,
}
