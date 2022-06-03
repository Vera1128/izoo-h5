import xml2js from 'xml2js';
import request from "request";
import { BackConfig } from "../configs/BackConfig";
import * as http from 'http';
import * as https from 'https';
import { Counter, Logger } from "tsrpc";

const httpsKeepAliveAgent = new https.Agent({
  keepAlive: true
})

const httpKeepAliveAgent = new http.Agent({
  keepAlive: true
})

export class HttpReqUtil {
  static counter = new Counter();

  /**
   * Get
   */
  static get<T = any>(uri: string, qs: object, logger?: Logger): Promise<T> {
    return this.request({
      method: 'GET',
      uri: uri,
      qs: qs
    }, logger)
  }

  /**
   * POST
   * @param options 
   * @param logger 
   * @returns 
   */
  static post<T = any>(uri: string, qs: object, body: any, json?: boolean, logger?: Logger): Promise<T> {
    return this.request({
      method: 'POST',
      uri: uri,
      qs: qs,
      body: body,
      json: json
    }, logger)
  }

  static request<T = any>(options: request.CoreOptions & { uri: string }, logger?: Logger): Promise<T> {
    return new Promise<T>((rs, rj) => {
      let reqId = this.counter.getNext()
      let op = request({
        timeout: BackConfig.HttpReqTimeout,
        json: options.json || true,
        gzip: true,
        agent: options.uri.startsWith('https') ? httpsKeepAliveAgent : httpKeepAliveAgent,
        ...options
      }, async (err?: Error, res?: request.Response, body?: any) => {
        if (err) {
          logger?.error(`HttpError->[${reqId}]:${err.message}`)
          rj(err);
          return;
        } else if (res && res.statusCode !== 200) {
          logger?.error(`HttpError->[${reqId}]:${res.statusCode}-${res.statusMessage}`, res.body);
          rj(new Error(res.body?.msg || `${res.statusCode} ${res.statusMessage}`));
          return;
        } else if (!body) {
          logger?.error(`HttpError->[${reqId}] Empty res body`);
          rj(new Error(`Empty res body`));
          return;
        }
        if (options.json && typeof body !== 'object') {
          try {
            body = JSON.parse(body);
          } catch (error) {
            logger?.error(`HttpError->[${reqId}] JSON format error`);
            rj(new Error(`HttpReq JSON format Error`));
            return;
          }
        } else if (options.json === false && typeof body === 'string') {

          let parser = new xml2js.Parser();

          let retData = await parser.parseStringPromise(body)
          logger?.debug(`接受 Http 返回:->[${reqId}]`, JSON.stringify(retData.xml, null, 2));

          rs(retData.xml)

        } else {
          logger?.debug(`接受 Http 返回:->[${reqId}]`, JSON.stringify(res?.body, null, 2));
          rs(body)
        }
      })
      logger?.debug(`发起 Http 请求:->[${reqId}] [${op.method}] ${op.uri.href} ${op.method === 'POST' ? `Body:${op.body}` : ''}`);
    })
  }
}