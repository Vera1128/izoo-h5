import moment from "moment";
import { ObjectId } from "mongodb";
import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { MainUtil } from "../../models/MainUtil";
import { listenItem, ReqListenData, ResListenData } from "../../shared/protocols/Center/PtlListenData";
import { populerItem } from "../../shared/protocols/Main/PtlGetPopulerData";

export async function ApiListenData(call: ApiCall<ReqListenData, ResListenData>) {

  let arr: populerItem[] = [] as any;

  let res = await Global.collection('ListenReport').find({
    userId: call.currentUser.userId
  }).sort({ updateTime: -1 }).toArray()

  let mainClassIds = res.map((item) => {
    return ObjectId.createFromHexString(item.mainClassId)
  })

  let mainClassData = await Global.collection('ContentMainClass').find({
    _id: {
      $in: mainClassIds
    },
    isDel: false,
  }).toArray()

  arr = await MainUtil.mainClassDataEvent(mainClassData, arr)

  for (let i = 0;i < arr.length;i++) {
    const item: listenItem = arr[i];
    let resItem = res.find(v => v.mainClassId === item.mainClassId)

    if (resItem) {
      item.lastListenTime = moment(resItem.updateTime).format('YYYY-MM-DD HH:mm:ss').valueOf()
    }

  }

  arr = arr.sort((a: any, b: any) => moment(b.lastListenTime).valueOf() - moment(a.lastListenTime).valueOf())

  call.succ({
    list: arr
  })

}