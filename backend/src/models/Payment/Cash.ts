import moment from "moment";
import md5 from 'md5';
import { Logger } from "tsrpc";
import { BackConfig } from "../../configs/BackConfig";
import { DbCashTransaction } from "../../dbItem/Order/DbCashTransaction";
import { Global } from "../Global";
import MongoUtil from "../MongoUtil";
import WXTransfer from "./WXTransfer";
import { ObjectId } from "mongodb";

interface toPaysItem {
  type: 'group' | 'single' | 'join',
  /** 团购订单的orderId */
  groupOrderId?: string,
  userId: number,
  mainClassId: string,
  price: number,
  realIp: string,
  phone?: number
}
interface toRefundItem {
  /** 团购订单的orderId */
  groupOrderId?: string,
  userId: number,
  mainClassId: string,
  price: number,
  realIp: string,
  phone?: number
}
export default class Cash {

  /**
   * 调起支付
   * @param uid 用户 id
   * @param realIp 真实 ip 地址
   */
  static async toPays(params: toPaysItem, logger?: Logger) {
    // 订单号 确保同一秒内统一 uid 订单不重复
    let partnerTradeNo = `${params.userId}${moment().valueOf()}`

    let WXPayRes = await WXTransfer({
      userId: params.userId,
      realIp: params.realIp,
      price: params.price,
      partnerTradeNo: partnerTradeNo,
      type: 'pay'
    }, logger)
    // 记录流水
    let record: DbCashTransaction = {
      _id: new ObjectId(),
      type: params.type,
      groupOrderId: params.groupOrderId,
      userId: params.userId,
      mainClassId: params.mainClassId,
      transRecordId: partnerTradeNo,
      state: false,
      meta: WXPayRes,
      price: Number(params.price),
      phone: params.phone,
      createTime: moment().valueOf(),
      updateTime: moment().valueOf(),
    }

    // 
    /**
     * 将支付流水记录下来
     * 并且重试 3 次
     */
    MongoUtil.retry(3, async () => {

      await Global.collection('CashTransaction').insertOne(record)

    });


    if (WXPayRes.return_code === 'FAIL') {

      throw new Error(`Call PlatForm API Error ${WXPayRes.return_msg}`);

    } else {

      //加密Sign =  拼接参数并加密MD5

      let sign = "appId=" + WXPayRes.appid! + "&nonceStr=" + WXPayRes.nonce_str! + "&package=" + "prepay_id=" + WXPayRes.prepay_id! + "&signType=MD5" + "&timeStamp=" + Math.floor(Date.now() / 1000) + "&key=" + BackConfig.WXPAY.partner_key;

      WXPayRes.sign = md5(sign).toUpperCase();

      WXPayRes.orderId = record.transRecordId

      return WXPayRes;

    }


  }

  /**
   * 未成功的团购定点,关闭订单,返还金额
   */
  static async toRefund(params: toRefundItem, logger?: Logger) {
    // 订单号 确保同一秒内统一 uid 订单不重复
    let partnerTradeNo = `${params.userId}${moment().valueOf()}`

    let WXPayRes = await WXTransfer({
      userId: params.userId,
      realIp: params.realIp,
      price: params.price,
      partnerTradeNo: partnerTradeNo,
      type: 'refund'
    }, logger)
    // 记录流水
    let record: DbCashTransaction = {
      _id: new ObjectId(),
      type: 'refund',
      groupOrderId: params.groupOrderId,
      userId: params.userId,
      mainClassId: params.mainClassId,
      transRecordId: partnerTradeNo,
      state: false,
      meta: WXPayRes,
      price: Number(params.price),
      phone: params.phone,
      createTime: moment().valueOf(),
      updateTime: moment().valueOf(),
    }


  }


}