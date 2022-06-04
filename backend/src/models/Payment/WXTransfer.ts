import WXPay, { WXTransfersRes } from './WXPay/WXPay';
import { Global } from '../Global';
import { BackConfig } from '../../configs/BackConfig';
import { Logger } from 'tsrpc';
import { nanoid } from 'nanoid';

export default async function WXTransfer(opt: {
    userId: number;
    realIp: string;
    price: number;
    partnerTradeNo: string;
    type: 'pay' | 'refund';
    out_trade_no?: string
}, logger?: Logger): Promise<WXTransfersRes> {

    let user = await Global.collection('User').findOne({
        _id: opt.userId
    })

    if (!user) {
        return { return_code: '[FAIL]', err_code_des: '[用户不存在]' };
    }

    if (opt.type === 'pay') {
        return await WXPay.instance.transfers({
            appid: BackConfig.WXPAY.appid,
            mch_id: BackConfig.WXPAY.mch_id,
            body: BackConfig.WXPAY.body,
            out_trade_no: opt.partnerTradeNo || ('2022' + (+new Date() + '') + Math.random().toString().substr(2, 11)),
            total_fee: Number(opt.price * 100),
            spbill_create_ip: opt.realIp,
            notify_url: BackConfig.WXPAY.notify_url,
            trade_type: BackConfig.WXPAY.trade_type,
            openid: user.auth.openid,
        }, logger)
    } else {
        return await WXPay.instance.refund({
            appid: BackConfig.WXPAY.appid,
            mch_id: BackConfig.WXPAY.mch_id,
            out_trade_no: opt.out_trade_no!,
            out_refund_no: opt.partnerTradeNo || ('2022' + (+new Date() + '') + Math.random().toString().substr(2, 11)),
            total_fee: Number(opt.price * 100),
            // notify_url: BackConfig.WXPAY.notify_url,
            refund_fee: Number(opt.price * 100),
        }, logger)
    }




}