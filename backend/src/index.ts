import { readFile } from 'fs'
import './models/ExtendApiCall'
import * as path from 'path'
import { HttpConnection, HttpServer } from 'tsrpc'
import { BackConfig } from './configs/BackConfig'
import { Global } from './models/Global'
import { serviceProto } from './shared/protocols/serviceProto'
import { parseSSO } from './models/flow/useSSOLogic'
const sha1 = require('sha1')
const xml2js = require('xml2js')

/**
 * 创建 server
 */
const server = new HttpServer(serviceProto, {
  port: BackConfig.Port,
  cors: BackConfig.Cors,
  logReqBody: BackConfig.Debug,
  logResBody: BackConfig.Debug,
  returnInnerError: true,
  debugBuf: BackConfig.DebugBuf,
  json: BackConfig.RESTful_API
})

/**
 * 协议加密
 */
if (BackConfig.ResquestEncry) {
  server.flows.preSendDataFlow.push(v => {
    console.log('typeof v.data', typeof v.data)
    if (!BackConfig.RESTful_API && typeof v.data === 'object') {
      // v.data = EncryptUtil.BinaryEncrypt(v.data)
    }
    return v
  })

  server.flows.preRecvDataFlow.push(v => {
    if (!BackConfig.RESTful_API && typeof v.data === 'object') {
      // v.data = EncryptUtil.BinaryEdecrypt(v.data)
    }
    return v
  })
}
/* 后端 api 默认访问跳转地址 */
server.flows.preRecvDataFlow.push(async v => {

  let conn = v.conn as HttpConnection

  let httpReq = conn.httpReq

  let httpRes = conn.httpRes

  Global.realIp = conn.ip

  if (httpReq.method === 'GET') {

    let signature = ''
    let timestamp = ''
    let nonce = ''
    let echostr = ''

    conn.logger.debug('Get ip->', conn.ip)

    /**
         * 重定向 Code->accessToken->userInfo
         */
    if (httpReq.url && httpReq.url.includes('/Login/Login')) {

      let start = httpReq.url.indexOf('code') + 5
      let end = httpReq.url.indexOf('&state')
      let code = httpReq.url.substring(start, end)

      let result = await v.conn.server.callApi('Login/Login', { code: code })

      if (result.isSucc) {

        httpRes.end(`${JSON.stringify(result.res.info)}`)

      } else {
        httpRes.writeHead(502, 'API Error')

        httpRes.end(`${JSON.stringify(result.err)}`)
      }

    }
    /**
         * 微信服务器安全域名地址验证
         */
    if (httpReq.url && httpReq.url === '/MP_verify_difKYtSg3GgTdWIY.txt') {
      readFile(`${process.cwd()}/public/MP_verify_difKYtSg3GgTdWIY.txt`, 'binary', (err, file) => {
        if (err) {

          httpRes.writeHead(404, 'not found')

          httpRes.end(`<h1>404 NOT FOUND</h1>`)

        } else {

          httpRes.write(file, 'binary')

          httpRes.end()

        }

      })
    }
    /**
         * 验证微信服务器配置
         */
    if (httpReq.url && httpReq.url.includes('signature=')) {
      let parasm = httpReq.url.split('').map((v: any) => {
        if (v === '/' || v === '?') {
          v = undefined
        }
        return v
      }).filter(Boolean).join('')

      let values = parasm.split('&')

      if (values.length > 0) {
        for (let i = 0; i < values.length; i++) {
          const item = values[i]
          if (item.includes('signature=')) {
            signature = item.replace('signature=', '')
          }
          if (item.includes('timestamp=')) {
            timestamp = item.replace('timestamp=', '')
          }
          if (item.includes('nonce=')) {
            nonce = item.replace('nonce=', '')
          }
          if (item.includes('echostr=')) {
            echostr = item.replace('echostr=', '')
          }
        }
      }

      let arrSort = [BackConfig.WeChatConfig.token, timestamp, nonce]

      arrSort.sort()

      const str = arrSort.join('')

      const shaStr = sha1(str)
      if (shaStr === signature) {

        httpRes.end(echostr)
      } else {
        httpRes.end(JSON.stringify({ code: -1, msg: 'token 认真失败' }))
      }
    } else {
      readFile(BackConfig.Base, 'binary', (err, file) => {
        if (err) {

          httpRes.writeHead(404, 'not found')

          httpRes.end(`<h1>404 NOT FOUND</h1>`)

        } else {

          httpRes.write(file, 'binary')

          httpRes.end()

        }

      })
    }

    return undefined

  } else if (httpReq.method === 'POST' && httpReq.url && httpReq.url.includes('/Order/WxNotify')) {

    const data = await xml2js.parseStringPromise(v.data)

    v.data = JSON.stringify(data.xml)
    
    v.serviceName = 'Order/WxNotify'

  }
    
  return v
})

/**
 * 处理接口[是否需登录]
 */
server.flows.preApiCallFlow.push(async v => {
  if (v.service.conf!.needLogin || v.req.sso) {
    // currentUser如果为空，则不会进入到后续协议（allowGuest除外）

    // @董帅 @king 待评审
    const uid = await parseSSO(v.req.sso)

    if (!uid) {
      v.error('您还未登录~', { code: 'NEED_LOGIN' })
      return
    }

    v.currentUser = {
      userId: uid
    }
  }
  return v
})

// Entry function
async function main() {

  // Auto implement APIs
  await server.autoImplementApi(path.resolve(__dirname, 'api'))

  await server.start().then(() => {

    server.logger.log('√ 服务器启动成功~')

    Global.init(server.logger).then(() => {

    }).catch((_err) => {

      server.logger.error(`x Global 启动异常`, _err.message)
    })

  }).catch(e => {

    server.logger.error('× 服务启动失败~', e)

  })
}

// Exit if any error during the startup
main().catch(e => {
  server.logger.error(e)
  process.exit(-1)
})

