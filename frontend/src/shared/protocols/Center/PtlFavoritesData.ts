
import { ResSearch } from "../PtlSearch";
import { BaseRequest, BaseConf } from "../Base";

/**
 * FavoritesList 请求-[获取用户收藏list]
 */
export interface ReqFavoritesData extends BaseRequest {

}

/**
 * FavoritesList 返回-[获取用户收藏list]
 * 降序排列-最新靠前
 */
export type ResFavoritesData = ResSearch

export const conf: BaseConf = {
  needLogin: true
} 
