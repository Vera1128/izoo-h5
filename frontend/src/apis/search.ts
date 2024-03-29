import statUtil from 'src/utils/statUtil'
import rpcClient from './apiClient'

// 获取请求记录
export async function getSearchHistory() {
  const res = await rpcClient.callApi('SearchHistory', {
    action: 'get',
  })
  return res
}

// 搜索
export async function search(content) {
  const res = await rpcClient.callApi('Search', { content })
  await statUtil.report('搜索', { content })
  return res
}

export default {
  getSearchHistory,
  search,
}
