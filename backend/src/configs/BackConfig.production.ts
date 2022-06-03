import { BackConfig } from "./BackConfig"


const evnParams = {
  /** 是否开启跨域 */
  CORS: process.env.cors,
  /** 服务端口 */
  PORT: process.env.PORT!,
  /* Mongodb 数据库地址 */
  MONGO_URI: process.env.MONGO_URI!,

}

Object.assign(BackConfig, {
  ENV: 'production',
  Cors: evnParams.CORS,
  Port: parseInt(evnParams.PORT),
  MongoURI: evnParams.MONGO_URI
})