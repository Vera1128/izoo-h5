import assert from "assert"
import { TestApiClient } from "../../Base"

describe('ApiSubDetail', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('SubDetail', async function () {
    let result = await apiClient.callApi('Detail/SubDetail', {
      mainClassId: '618a9c920109e1ce065e5896',
      subId: '617e861fe4b12aab13203dda'
    })

    if(!result.isSucc) {
      console.error(result.err)
    }

    if (result.isSucc && result.res) {
      console.log('SubDetail_info', result.res)
    }

    assert.strictEqual(result.isSucc, true)

  })


})