import rpcClient from './apiClient'

// 测试登录
export async function testLogin() {
  const res = await rpcClient.callApi('Login/TestLogin', {
    userId: 'oDfcY69wA2QERN9mBhuMOvCFsPxQ',
  })
  return res
}

export default {
  testLogin,
}
