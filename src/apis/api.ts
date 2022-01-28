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

export default {
  testLogin,
  getSignature,
  prodLogin,
}
