import { HttpClient } from 'tsrpc-browser'
import Toast from 'components/Toast'
import { serviceProto } from '../walkidz-shared/shared/protocols/serviceProto'

// 创建全局唯一的 apiClient，需要时从该文件引入
const apiClient = new HttpClient(serviceProto, {
  server: 'https://api.walkidz.com/release/',
  json: true,
  logger: console,
})

apiClient.flows.postApiReturnFlow.push((v) => {
  const {
    isSucc,
    err: { message },
  } = v.return
  if (!isSucc && message) {
    Toast(message, 2000)
    return
  }
  return v
})

export default apiClient
