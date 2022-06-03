import { Crypto } from 'k8w-crypto';
import moment from 'moment';
import { ObjectId } from 'mongodb';
import { BackConfig } from '../../configs/BackConfig';
import { UserUtil } from '../UserUtil';

/**
 * tsrpc apiCall 定义
 */
declare module 'tsrpc' {
  export interface ApiCall {
    currentUser: {
      userId: number
    }
  }
}

/**
 * sso 加密
 */
export function createSSO(uid: number) {
  /**
   * sso = salt + uid + expiredTime
   */

  // Expansion 可拓展增加字段
  const ssoStr = JSON.stringify([uid])

  const sign = Crypto.md5(ssoStr + BackConfig.SSO.salt)

  // 挂起
  // @董帅
  const expriedTime = moment().add(BackConfig.SSO.expiredTime, 'days').valueOf();

  return Crypto.base64Encode(`${sign}|${ssoStr}|${expriedTime}`)

}

/**
 * sso 解密
 */
export async function parseSSO(sso: string): Promise<number | undefined> {

  if (!sso) {
    return undefined
  }

  const base64Str = Crypto.base64Decode(sso);

  const strArr = base64Str.split('|');

  if (strArr.length !== 3 || !strArr[0].length || !strArr[1].length || !strArr[2].length) {
    return undefined
  }

  const sign = strArr[0];

  const ssoStr = strArr[1];

  // const expiredTime = Number(strArr[2])

  // 重复对比 sign
  if (sign !== Crypto.md5(ssoStr + BackConfig.SSO.salt)) {
    return undefined
  }

  // 校验时间
  // 挂起@董帅
  // if (expiredTime < moment().valueOf()) {
  //   return undefined
  // }

  const ssoObj = JSON.parse(ssoStr)

  const userInfo = await UserUtil.getUserInfo(ssoObj[0])

  if(!userInfo) {
    return undefined
  }

  return ssoObj[0]

}