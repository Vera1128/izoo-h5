import path from "path"


export const BackConfig = {

  /* 后端服务启动端口 */
  Port: 9000, // dev 3000 prod 9000

  /** 服务启动页 */
  Base: `${process.cwd()}/public/index.html`,

  /* 环境变量 */
  ENV: 'dev',

  /** RESTful API 模式 JSON 传递 */
  RESTful_API: true,

  /**  是否开启协议加密 */
  ResquestEncry: false,

  /**
   * 是否开启 debug 模式
   * Req、Res 请求数据
   * true：终端输出日志
   * false: 关闭日志输出
   */
  Debug: true,

  /**
   * 输出 Buf 日志
   */
  DebugBuf: false,

  /* 数据库地址 */
  // MongoURI: 'mongodb://root:xald_666@dds-wz9db1a2fec479441558-pub.mongodb.rds.aliyuncs.com:3717,dds-wz9db1a2fec479442715-pub.mongodb.rds.aliyuncs.com:3717/test?authSource=admin&replicaSet=mgset-20567609',
  MongoURI: 'mongodb://120.76.133.169:30000/walkidz',

  /** redis 链接地址 */
  Redis: {
    host: 'r-xlad-queue.redis.rds.aliyuncs.com',
    port: 6379,
    password: 'xald_666_queue',
    db: 5
  },

  /* 跨域配置 */
  Cors: '*',

  /* 登录缓存配置 */
  Cache: {
    cacheTime: 0,
    fetchTime: 0,
    fetchTimeout: 0,
  },

  /* 是否开启日志打印 */
  LogInOneLine: false,

  /* 对外的 http 请求的超市时间 */
  HttpReqTimeout: 5000,


  /** 
   * 微信公众号 token
   */
  WeChatConfig: {
    token: 'walkidz',
    appId: 'wxf93b23e8acb83eff',
    secret: '05033371ed7c0ccc7457a788223c1ca7',
  },

  /**
   * Geo 配置
   */
  Geo: {
    key: 'Content',
    radius: 100,
  },

  SSO: {
    /** 盐 */
    salt: 'Gamify',
    /** 7天 */
    expiredTime: 3
  },

  WXPAY: {
    /** 微信公众号 appid */
    appid: 'wxf93b23e8acb83eff',
    /** 微信商户支付,商户 id */
    mch_id: '1615784999',
    /** 微信商户支付 api 秘钥 */
    partner_key: 'o5d1NjVqplBpm6HCcBOraatqyE7PJTyV',
    /** 微信支付回调地址 */
    notify_url: 'https://api.walkidz.com/release/Order/WxNotify',
    /** 支付类型 */
    trade_type: 'JSAPI',
    body: '爱走心球'
  },

  nanoid: {
    ids: '0123456789'
  }

}

if (process.env['NODE_ENV'] === 'production') {
  require('./BackConfig.production')
}