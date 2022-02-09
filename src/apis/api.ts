import rpcClient from './apiClient'

// 测试登录
export async function testLogin() {
  const res = await rpcClient.callApi('Login/TestLogin', {
    userId: 'oDfcY69wA2QERN9mBhuMOvCFsPxQ',
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
  const url = `https://oss.walkidz.com/h5/v2/index.html`
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
