import assert from "assert"
import { TestApiClient } from "../../Base"

describe('ApiMainDetail', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('MainDetail', async function () {
    let result = await apiClient.callApi('Detail/MainDetail', {
      mainClassId: '618a9c920109e1ce065e5896'
    })

    if(!result.isSucc) {
      console.error(result.err)
    }

    if (result.isSucc && result.res) {
      console.log('MainDetail_info', result.res.info)
      console.log('MainDetail_isCollect', result.res.isCollect)
      console.log('MainDetail_isPayment', result.res.isPayment)
      console.log('MainDetail_duration', result.res.duration)
      console.log('MainDetail_totals', result.res.totals)
    }

    assert.strictEqual(result.isSucc, true)

  })


})