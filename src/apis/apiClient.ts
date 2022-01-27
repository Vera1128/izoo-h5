import { HttpClient } from 'tsrpc-browser'
import { notify } from '@tgu/toast'
import { testLogin } from 'apis/api'
import { serviceProto } from '../walkidz-shared/shared/protocols/serviceProto'

// 创建全局唯一的 apiClient，需要时从该文件引入
const apiClient = new HttpClient(serviceProto, {
  server: 'https://api.walkidz.com/release/',
  // server: 'http://172.19.82.226:9000',
  json: true,
  logger: console,
})

apiClient.flows.preApiReturnFlow.push((v) => {
  const { isSucc, err } = v.return
  if (err?.code === 'NEED_LOGIN') {
    testLogin()
    return
  }
  if (!isSucc && err?.message) {
    notify(err?.message, 2000)
    return
  }
  return v
})

apiClient.flows.preCallApiFlow.push((v) => {
  // 如果不存在userId，则加上

  // @董帅
  const sso = localStorage.getItem('sso') as undefined

  if (sso && !v.req.sso) {
    v.req.sso = sso
  }
  // const {
  //   req: { sso },
  // } = v
  // if (!sso) v.req.userId = window.userInfo?.userId || 'oDfcY69wA2QERN9mBhuMOvCFsPxQ'
  return v
})

export default apiClient
