import * as scheme from 'src/schemes'
import rpcClient from './apiClient'

// 获取主题列表
export async function getTypeList(type: scheme.TypeListParams) {
  const res = await rpcClient.callApi('List/TypeList', {
    type,
  })
  return res
}

// 获取路线列表
export async function getTypeData(data: scheme.TypeDataParams) {
  const res = await rpcClient.callApi('List/TypeData', data)
  return res
}

export default {
  getTypeList,
  getTypeData,
}
