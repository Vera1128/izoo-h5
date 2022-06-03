import assert from "assert"
import { TestApiClient } from "../../Base"

describe('ApiGetCoupon', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('GetCoupon', async function () {
    let result = await apiClient.callApi('Center/GetCoupon', {})

    if(!result.isSucc) {
      console.error(result.err)
    }

    if (result.isSucc && result.res) {
      console.log('GetCoupon', result.res.list)
    }

    assert.strictEqual(result.isSucc, true)

  })


})