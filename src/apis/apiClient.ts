import { HttpClient } from 'tsrpc-browser'
import { serviceProto } from '../walkidz-shared/shared/protocols/serviceProto'

// 创建全局唯一的 apiClient，需要时从该文件引入
const apiClient = new HttpClient(serviceProto, {
  server: 'https://api.walkidz.com/release/',
  json: true,
  logger: console,
})

export default apiClient
