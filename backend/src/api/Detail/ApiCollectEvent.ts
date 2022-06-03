import { ApiCall } from "tsrpc";
import { Global } from "../../models/Global";
import { ReqCollectEvent, ResCollectEvent } from "../../shared/protocols/Detail/PtlCollectEvent";

export async function ApiCollectEvent(call: ApiCall<ReqCollectEvent, ResCollectEvent>) {

  let state: boolean = false;

  let userRes = await Global.collection('CollectData').findOne({
    userId: call.currentUser.userId,
    mainClassId: call.req.mainClassId
  })

  if (userRes) {
    state = userRes.state
  }

  let result = await Global.collection('CollectData').findOneAndUpdate({
    userId: call.currentUser.userId,
    mainClassId: call.req.mainClassId
  }, {
    $set: {
      state: !state,
      updateTime: new Date()
    }
  }, {
    upsert: true,
    returnDocument: 'after'
  })

  call.succ({
    state: result.value ? result.value?.state : state
  })

}