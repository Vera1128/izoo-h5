import rpcClient from './apiClient'

export async function testLogin() {
  const res = await rpcClient.callApi('Login/TestLogin', {
    userId: 'oDfcY69wA2QERN9mBhuMOvCFsPxQ',
  })
  console.log('结果')
  console.log(res)
  return res
}

export default {
  testLogin,
}
