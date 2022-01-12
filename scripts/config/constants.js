const path = require('path')
const packageJson = require('../../package.json')

const PROJECT_PATH = path.resolve(__dirname, '../../') // 项目package.json
const PROJECT_NAME = packageJson.name || PROJECT_PATH.name // 项目名称
const APP_NAME = PROJECT_NAME // 云效部署时候的项目名称 - 默认使用项目的名称
const BASE_PATHNAME = `/${APP_NAME}/` // 基础路由地址
const SERVER_PORT = 8080 // 开发环境的端口
const SERVER_HOST = '0.0.0.0' // 开发环境的host - 需要配合switchhost来设置映射
const ENV = process.env.NODE_ENV // 当前环境
const IS_DEV = ENV === 'dev' // 是否是开发模式
const SENTRY_DSN = '' // sentry的dsn

module.exports = {
  PROJECT_PATH,
  PROJECT_NAME,
  SERVER_HOST,
  SERVER_PORT,
  APP_NAME,
  ENV,
  IS_DEV,
  SENTRY_DSN,
  BASE_PATHNAME,
}
