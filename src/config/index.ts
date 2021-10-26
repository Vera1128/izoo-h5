import { IConfig, EEnv } from './types'

// 生产环境配置
const prod: IConfig = {
  BASE_URL: '',
  DAKA_URL: '',
  BASE_PASSPORT_URL: '',
}

// uat环境配置
const uat: IConfig = {
  BASE_URL: '',
  DAKA_URL: '',
  BASE_PASSPORT_URL: '',
}

// test环境配置
const test: IConfig = {
  BASE_URL: '',
  DAKA_URL: '',
  BASE_PASSPORT_URL: '',
}

// dev环境配置
const dev: IConfig = {
  BASE_URL: '',
  DAKA_URL: '',
  BASE_PASSPORT_URL: '',
}

// mock环境配置
const mock: IConfig = {
  BASE_URL: '',
  DAKA_URL: '',
  BASE_PASSPORT_URL: '',
}

// 根据环境，获取配置
function getEnvConfig(env: EEnv) {
  switch (env) {
    case EEnv.PROD:
      return prod
    case EEnv.UAT:
      return uat
    case EEnv.TEST:
      return test
    case EEnv.MOCK:
      return mock
    default:
      return dev
  }
}

const config = getEnvConfig(APP_ENV as EEnv)

export default config
