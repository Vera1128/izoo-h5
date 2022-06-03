import { Logger } from "tsrpc";
import { HttpReqUtil } from "./HttpReqUtil";
import { BackConfig } from "../configs/BackConfig";
import { Global } from "./Global";
import moment from "moment";
import jsSHA from 'jssha';
import { DbUser } from "../dbItem/User/DbUser";

/**
 * accessToken 授权返回
 */
export interface accessTokenItem {
  access_token: string,
  expires_in: number,
  refresh_token: string,
  openid: string,
  scope: string
}

/**
 * 获取用户昵称信息
 */
// export interface UserInfoItem {
//   subscribe: string,
//   openid: string,
//   nickname: string,
//   sex: number,
//   language: string,
//   city: string,
//   province: string,
//   country: string,
//   headimgurl: string,
//   subscribe_time: number,
//   remark: string,
//   groupid: number,
//   tagid_list: string[],
//   subscribe_scene: string,
//   qr_scene: string,
//   qr_scene_str: string,
//   unionid: number,
// }
export type UserInfoItem = {
  "openid": string,
  "nickname": string,
  "sex": number,
  "province": string,
  "city": string,
  "country": string,
  "headimgurl": string,
  "privilege": string[],
  "unionid": string
} & { auth?: DbUser['auth'] }

/**
 * 获取ticket
 */
export interface ticketItem extends Error {
  ticket: string,
  expires_in: number
}

/**
 * 签名算法
 */
interface signatureItem extends Error {
  jsapi_ticket: string,
  noncestr: string,
  timestamp: string,
  url: string,
  signature?: string
}

/**
 * api接口错误返回
 */
export interface Error {
  errcode?: number,
  errmsg?: string
}

export class WeChatUtil {

  /**
   * 获取微信登录accessToken
   * code: 客户端code
   */
  static async getAccessToken(logger?: Logger): Promise<{ access_token: string } & Error> {

    // 判断token 是否过去,并重新获取

    let isExisten = await Global.collection('Config').findOne({
      _id: 'AccessToken',
    })

    if (isExisten) {

      // 提前15 分钟进行重新授权更新
      if (moment(isExisten.data.expires_in).subtract(15, 'minutes').valueOf() < moment().valueOf()) {
        // update
        let result = await this.getGlobalAccessToken(logger)

        if (result.errcode) {

          return result

        }

        await Global.collection('Config').findOneAndUpdate({
          _id: "AccessToken"
        }, {
          $set: {
            data: {
              access_token: result.access_token,
              expires_in: moment().add(result.expires_in, 'seconds').valueOf(),
            },
            updateTime: new Date()
          }
        }, {
          upsert: true,
          returnDocument: 'after'
        })

        isExisten.data.access_token = result.access_token

      }

      return {
        access_token: isExisten.data.access_token!
      }

    }
    // add
    let result = await this.getGlobalAccessToken(logger)

    if (result.errcode) {

      return result

    }

    await Global.collection('Config').insertOne({
      _id: "AccessToken",
      data: {
        access_token: result.access_token,
        expires_in: moment().add(result.expires_in, 'seconds').valueOf()
      },
      updateTime: new Date()
    })

    return {
      access_token: result.access_token
    }

  }

  /**
   * 获取 微信公众号全局 accessToken 数据
   * @param code 
   * @param logger 
   * @returns 
   */
  static async getGlobalAccessToken(logger?: Logger) {

    const OAuthUri = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${BackConfig.WeChatConfig.appId}&secret=${BackConfig.WeChatConfig.secret}`

    const result: { access_token: string, expires_in: number } & Error = await HttpReqUtil.get(OAuthUri, {}, logger);

    return result

  }

  /**
   * code -> openId
   * @param code
   * @returns 
   */
  static async getOpenId(code: string, logger?: Logger): Promise<accessTokenItem & Error> {

    const OAuthUri = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${BackConfig.WeChatConfig.appId}&secret=${BackConfig.WeChatConfig.secret}&grant_type=authorization_code&code=${code}`

    const result: accessTokenItem & Error = await HttpReqUtil.get(OAuthUri, {}, logger);

    return result

  }


  static async checkAccessToken(ob: accessTokenItem) {

    const uri = `https://api.weixin.qq.com/sns/auth?access_token=${ob.access_token}&openid=${ob.openid}`

    const result = await HttpReqUtil.get(uri, {});

    return result

  }


  /**
   * openId -> userInfo
   */

  static async getUserInfo(ob: accessTokenItem, logger?: Logger): Promise<UserInfoItem & Error> {

    // const uri = `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${ob.access_token}&openid=${ob.openid}&lang=zh_CN`
    const uri = `https://api.weixin.qq.com/sns/userinfo?access_token=${ob.access_token}&openid=${ob.openid}&lang=zh_CN`

    const result: UserInfoItem & Error = await HttpReqUtil.get(uri, {}, logger);

    return result

  }

  /**
   * accessToken -> jsapi_ticket
   */
  static async getJSAPITIcket(accessToken: string, logger?: Logger) {

    const uri = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`

    const result: ticketItem = await HttpReqUtil.get(uri, {}, logger)

    return result

  }

  /**
   * 获取 ticket 信息
   */
  static async ticketEvent(access_token: string, logger?: Logger): Promise<ticketItem> {
    // find -> update -> add
    let isExisten = await Global.collection('Config').findOne({
      _id: 'Ticket',
    })

    if (isExisten) {
      // 提前15 分钟进行重新授权更新
      if (moment(isExisten.data.expires_in).subtract(15, 'minutes').valueOf() < moment().valueOf()) {
        // update
        let result = await this.getJSAPITIcket(access_token, logger)

        if (result.errcode) {

          return result

        }

        await Global.collection('Config').findOneAndUpdate({
          _id: 'Ticket'
        }, {
          $set: {
            data: {
              ticket: result.ticket,
              expires_in: moment().add(result.expires_in, 'seconds').valueOf(),
            },
            updateTime: new Date()
          }
        }, {
          upsert: true,
          returnDocument: 'after'
        })

        return result

      }

      return {
        ticket: isExisten.data.ticket!,
        expires_in: isExisten.data.expires_in!
      }

    }

    let result = await this.getJSAPITIcket(access_token, logger)

    if (result.errcode) {

      return result

    }

    await Global.collection('Config').insertOne({
      _id: 'Ticket',
      data: {
        ticket: result.ticket,
        expires_in: moment().add(result.expires_in, 'seconds').valueOf()
      },
      updateTime: new Date()
    })

    return {
      ticket: result.ticket!,
      expires_in: result.expires_in!
    }
  }

  /**
   * 签名算法
   */
  static async signatureAction(url: string, logger?: Logger): Promise<Partial<signatureItem>> {

    let accessToken = await this.getAccessToken()

    if (accessToken.errcode) {
      return accessToken
    }

    let ticket = await this.ticketEvent(accessToken.access_token)
    console.log('ticket', ticket);

    if (ticket.errcode) {
      return ticket
    }

    /**
     * 算法处理
     */

    let ret: signatureItem = {
      jsapi_ticket: ticket.ticket,
      noncestr: Math.random().toString(36).substr(2, 15),
      timestamp: moment().unix().toString(),
      url: url
    }

    let string = this.raw(ret);

    logger?.debug('ret', ret)
    logger?.debug('string', string)

    let shaObj = new jsSHA('SHA-1', 'TEXT');
    shaObj.update(string)
    ret.signature = shaObj.getHash('HEX');

    return ret

  }

  static raw(ret: any) {
    let keys = Object.keys(ret);
    keys = keys.sort();
    let newArgs: any = {} as any;
    keys.forEach((key) => {
      newArgs[key.toLowerCase()] = ret[key]
    })

    let string = '';

    for (const key in newArgs) {
      string += `&${key}=${newArgs[key]}`
    }

    string = string.substr(1);

    return string

  }

}