import { Global } from './Global';
import { Crypto } from "k8w-crypto";
import moment from 'moment';
import { Logger } from 'tsrpc';
import { ObjectId } from 'mongodb';
import { UserInfoItem } from './WeChatUtil';
import { ResLogin } from '../shared/protocols/Login/PtlLogin';
import { createSSO } from './flow/useSSOLogic';
import { customAlphabet } from 'nanoid';
import { BackConfig } from '../configs/BackConfig';


export class UserUtil {

    /**
     * 解析客户端带来的sso
     * @param sso  
     * @param logger 
     * @returns 
     */
    static async parseSso(sso: string | undefined, logger?: Logger): Promise<string | undefined> {

        if (!sso) {
            return undefined;
        }

        try {
            var s64 = Crypto.base64Decode(sso);
        }
        catch (e) {
            logger?.error(e);
            return undefined;
        }

        let arr = s64.split('|');
        if (arr.length !== 3 || !arr[0].length || !arr[1].length || !arr[2].length) {
            return undefined;
        }

        let userId = arr[0];
        let ssoId = arr[1];
        let expiredTime = arr[2];

        if (moment().valueOf() > moment(expiredTime).valueOf()) {

            // del
            await Global.collection('UserSSO').deleteOne({
                _id: ObjectId.createFromHexString(ssoId)
            })
            return undefined;
        }

        // 验证SSO合法
        if (!await Global.collection('UserSSO').find({
            _id: ObjectId.createFromHexString(ssoId),
            userId: userId
        }).hasNext()) {
            return undefined;
        }

        return userId
    }

    /**
     * 获取用户信息
     * @param uid 
     * @returns 
     */
    static async getUserInfo(userId: number, logger?: Logger): Promise<ResLogin | undefined> {

        if (!userId) {
            return undefined
        }

        let user = await Global.collection('User').findOne({
            _id: userId
        })

        if (!user) {
            return undefined;
        }

        return {
            info: {
                ...user.info,
                userId: userId
            },
        }
    }

    /**
     * 更新用户数据
     */
    static async userInfoEvent(userInfo: UserInfoItem, logger?: Logger): Promise<ResLogin | undefined> {

        let now = moment().valueOf()

        const nanoid = customAlphabet(BackConfig.nanoid.ids)

        let result = await Global.collection('User').findOneAndUpdate({
            'auth.openid': userInfo.openid
        }, {
            $set: {
                updateTime: now,
                info: {
                    nickName: userInfo.nickname,
                    avatar: userInfo.headimgurl,
                    gender: userInfo.sex,
                    province: userInfo.province,
                    city: userInfo.city,
                    country: userInfo.country,
                },
                auth: userInfo.auth
            },
            $setOnInsert: {
                createTime: now,
                _id: Number(nanoid(6))
            }
        }, {
            returnDocument: 'after',
            upsert: true,
        })

        if (!result.value) {

            logger?.error('User Error')

            return undefined

        }

        const sso = createSSO(result.value!._id)

        return {
            sso: sso,
            info: {
                ...result.value!.info,
                userId: result.value!._id
            }
        }

    }

}