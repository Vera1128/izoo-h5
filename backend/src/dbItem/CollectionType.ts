import { DbConfig } from "./Config/DbConfig";
import { DbCoupon } from "./DbCoupon";
import { DbCouponStat } from "./DbCouponStat";
import { DbMainCityPoster } from "./Main/DbMainCityPoster";
import { DbMainScroll } from "./Main/DbMainScroll";
import { DbTags } from "./Main/DbTags";
import { DbCashTransaction } from "./Order/DbCashTransaction";
import { DbGroupRecords } from "./Order/DbGroupRecords";
import { DbSearchStat } from "./Search/DbSearchStat";
import { DbStat } from "./Stat/DbStat";
import { DbStatHistory } from "./Stat/DbStatHistory";
import { DbCollectData } from "./User/DbCollectData";
import { DbListenReport } from "./User/DbListenReport";
import { DbUser } from "./User/DbUser";
import { DbUserSSO } from "./User/DbUserSSO";


export interface CollectionType {

  /** user */
  User: DbUser,
  UserSSO: DbUserSSO,
  CollectData: DbCollectData
  ListenReport: DbListenReport

  /** Config */
  Config: DbConfig,

  /** Main */
  MainScroll: DbMainScroll,
  Tags: DbTags,
  MainCityPoster: DbMainCityPoster,

  /** content */
  ContentMainClass: any,
  ContentSubClass: any,
  ContentValueClass: any

  /** 支付 */
  CashTransaction: DbCashTransaction
  GroupRecords: DbGroupRecords

  /** 搜索 */
  SearchStat: DbSearchStat


  /** 统计 */
  ActionStat: DbStat
  ActionStatHistory: DbStatHistory

  /** 优惠券录入 */
  Coupon: DbCoupon
  CouponStat: DbCouponStat

}