import { ObjectId } from 'mongodb'
import { ApiCall } from 'tsrpc'
import { Global } from '../../models/Global'
import { ListUtil } from '../../models/ListUtil'
import { ReqFavoritesData, ResFavoritesData } from '../../shared/protocols/Center/PtlFavoritesData'

export async function ApiFavoritesData(call: ApiCall<ReqFavoritesData, ResFavoritesData>) {

  let arr: ResFavoritesData['list'] = [] as any

  let result = await Global.collection('CollectData').find({
    userId: call.currentUser.userId,
    state: true
  }).sort({ updateTime: -1 }).toArray()


  let mainClassIds = result.map((v) => {
    return ObjectId.createFromHexString(v.mainClassId)
  })

  let favoritesRes = await Global.collection('ContentMainClass').find({
    _id: {
      $in: mainClassIds
    },
    state: true,
    isDel: false
  }).project({ city: 1, address: 1, title: 1, desc: 1, tags: 1, scrollImages: 1 }).toArray()

  if (favoritesRes.length > 0) {

    arr = await ListUtil.listDataEvent(favoritesRes, arr)

  }

  call.succ({
    list: arr
  })

}