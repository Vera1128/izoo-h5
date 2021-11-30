import rpcClient from './apiClient'
import * as scheme from 'src/schemes'

// 获取城市路线数据
export async function getCityData() {
  const res = await rpcClient.callApi('Main/GetCityData', {})
  return res
}

// 获取热门路线数据
export async function getPopulerData() {
  const res = await rpcClient.callApi('Main/GetPopulerData', {})
  return res
}

// 获取轮播图信息
export async function getScrollData() {
  const res = await rpcClient.callApi('Main/GetScrollData', {})
  return res
}

// 获取行走主题
export async function getTagsData() {
  const res = await rpcClient.callApi('Main/GetTagsData', {})
  return res
}

// 获取附近的内容数据
export async function getNearbyData(props: scheme.NearbyParams) {
  const res = await rpcClient.callApi('Main/NearbyData', props)
  return res
}

export default {
  getCityData,
  getPopulerData,
  getScrollData,
  getTagsData,
  getNearbyData,
}
