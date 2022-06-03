/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2022-02-09 18:55:08
 * @LastEditTime: 2022-04-23 17:07:10
 */
import rpcClient from './apiClient'

// 测试登录
export async function testLogin() {
  const res = await rpcClient.callApi('Login/TestLogin', {
    // userId: 171910,  // 小董
    userId: 280757, // 杨杨
  })
  return res
}

// 正式登录
export async function prodLogin(code) {
  const res = await rpcClient.callApi('Login/Login', {
    code,
  })
  return res
}

// 获取当前用户信息

export async function getCurrentUser() {
  const res = await rpcClient.callApi('Login/CurrentUser', {})

  return res
}

// 获取wx.config加密算法
export async function getSignature(url) {
  const res = await rpcClient.callApi('Config/GetSignature', {
    url,
  })
  return res
}

// 记录 flow 中
export function ssoToFlow(sso: string) {
  rpcClient.flows.preApiReturnFlow.push((v) => {
    v.req.sso = sso
    return v
  })
}

// 重定向
export function redirectLogin() {
  localStorage.clear()
  const url = window.location.href
  const jump = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf93b23e8acb83eff&redirect_uri=${encodeURIComponent(
    url,
  )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redire`
  window.location.href = jump
}

export default {
  testLogin,
  getSignature,
  prodLogin,
}
