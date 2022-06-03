
import { ResSearch } from "../PtlSearch";
import { BaseConf } from "./../Base";
import { ReqTypeList } from "./PtlTypeList";

/**
 * TypeData 请求-[切换主题 list]
 */
export type ReqTypeData = ReqTypeList & {
  /** type list value */
  value: string
}

/**
 * TypeData 返回-[切换主题 list]
 */
export type ResTypeData = ResSearch

export const conf: BaseConf = {
  needLogin: true
}
