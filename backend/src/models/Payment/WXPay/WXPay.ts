import xml2js from 'xml2js';
import { BackConfig } from '../../../configs/BackConfig';
import md5 from 'md5';
import { HttpReqUtil } from '../../HttpReqUtil';
import { Logger } from 'tsrpc';
import path from 'path';
import { readFileSync } from 'fs';

export interface WXTransfersRes {
    orderId?: string;
    return_code: string;
    return_msg?: string;
    result_code?: string;
    mch_id?: string;
    appid?: string;
    nonce_str?: string;
    sign?: string;
    prepay_id?: string;
    trade_type?: string;
    err_code_des?: string;
}

/** 发起支付 */
export interface transfersItem {
    appid: string,
    mch_id: string,
    body: string,
    out_trade_no: string,
    total_fee: number,
    spbill_create_ip: string,
    notify_url: string,
    trade_type: string,
    openid: string,
    nonce_str?: string
    sign?: string
}

/**
 * 退款
 */
export interface refundsItem {
    appid: string,
    mch_id: string,
    out_refund_no: string,
    // notify_url: string,
    total_fee: number,
    nonce_str?: string
    sign?: string,
    out_trade_no: string
    refund_fee: number,
}


export default class WXPay {
    private options: any;
    private wxpayID: any;
    private static _instance: WXPay;


    constructor() {
        this.options = {
            appid: BackConfig.WXPAY.appid,
            mch_id: BackConfig.WXPAY.mch_id,
            partner_key: BackConfig.WXPAY.partner_key,
        };
        this.wxpayID = { appid: this.options.appid, mch_id: this.options.mch_id };
    }

    static get instance(): WXPay {
        if (!this._instance) {
            this._instance = new WXPay();
        }
        return this._instance;
    }


    static buildXML(json: object) {
        let builder = new xml2js.Builder();
        return builder.buildObject(json);
    };

    static generateNonceString(length: number = 32) {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let maxPos = chars.length;
        let noceStr = "";
        for (let i = 0;i < (length);i++) {
            noceStr += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return noceStr;
    };

    private sign(param: any) {

        let querystring = Object.keys(param).filter(function (key) {
            return param[key] !== undefined && param[key] !== ''.indexOf(key) < 0;
        }).sort().map(function (key) {
            return key + '=' + param[key];
        }).join("&") + "&key=" + this.options.partner_key;

        return md5(querystring).toUpperCase();
    }

    /**
     * 小程序支付
     */
    async transfers(opts: transfersItem, logger?: Logger): Promise<WXTransfersRes> {

        // opts.nonce_str = WXPay.generateNonceString();
        opts.nonce_str = opts.nonce_str || WXPay.generateNonceString();
        opts.sign = opts.sign || this.sign(opts);

        const uri = 'https://api.mch.weixin.qq.com/pay/unifiedorder';

        try {

            let result = await HttpReqUtil.post(uri, {}, WXPay.buildXML(opts), false, logger)

            let retData: WXTransfersRes = {} as any

            for (let key of Object.keys(result)) {
                let tmpK: any = key;
                let k: keyof WXTransfersRes = tmpK
                retData[k] = result[key][0];
            }

            return retData

        } catch (error) {

            throw new Error('Cash logic Error' + error)

        }

    }

    /**
     * 退款 
     */

    async refund(opts: refundsItem, logger?: Logger) {
        opts.nonce_str = opts.nonce_str || WXPay.generateNonceString()
        opts.sign = opts.sign || this.sign(opts);
        const uri = 'https://api.mch.weixin.qq.com/secapi/pay/refund'
        try {
            let result = await HttpReqUtil.post(uri, {}, WXPay.buildXML(opts), false, logger, {
                rejectUnauthorized: false,
                pfx: readFileSync(path.resolve(__dirname, './apiclient_cert.p12')),
                passphrase: opts.mch_id
            })

            let retData: WXTransfersRes = {} as any

            for (let key of Object.keys(result)) {
                let tmpK: any = key;
                let k: keyof WXTransfersRes = tmpK
                retData[k] = result[key][0];
            }
            console.log('retData', retData)
            return retData
        } catch (error) {
            throw new Error('Cash logic Error' + error)

        }
    }
}