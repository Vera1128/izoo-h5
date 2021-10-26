export interface IConfig {
  BASE_URL: string; // 基础主站地址
  DAKA_URL: string; // 打卡地址
  BASE_PASSPORT_URL: string; // 主站认证地址
}

export enum EEnv {
  PROD = 'prod', // 生产环境
  UAT = 'uat', // 预发布环境
  TEST = 'test', // 测试环境
  MOCK = 'mock', // mock环境
  DEV = 'dev', // 开发环境
}