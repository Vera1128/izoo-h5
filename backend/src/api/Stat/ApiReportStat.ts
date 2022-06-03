import { ApiCall } from 'tsrpc'
import { Global } from '../../models/Global'
import { ReqReportStat, ResReportStat } from '../../shared/protocols/Stat/PtlReportStat'

export async function ApiReportStat(call: ApiCall<ReqReportStat, ResReportStat>) {

  const now = new Date()

  await Promise.all([
    Global.collection('ActionStatHistory').insertOne({
      action: call.req.action,
      uid: call.currentUser ? call.currentUser.userId : undefined,
      time: now,
      data: call.req.data || undefined
    }),
    Global.collection('ActionStat').findOneAndUpdate({
      _id: `${now.format('YYYY-MM-DD')}-${call.req.action}`,
      date: now.format('YYYY-MM-DD')
    }, {
      $inc: {
        pv: 1,
        uv: call.req.isFirstDay ? 1 : 0
      },
      $setOnInsert: {
        action: call.req.action
      }
    }, {
      upsert: true
    })

  ])
  call.succ({})

}