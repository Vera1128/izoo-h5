import assert from "assert"
import { TestApiClient } from "../../Base"

describe('ApiGetScrollData', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('GetScrollData', async function () {
    let result = await apiClient.callApi('Main/GetScrollData', {})

    if (!result.isSucc) {
      console.error(result.err)
    }

    if (result.isSucc && result.res) {
      console.log('GetScrollData', result.res.list)
    }

    assert.strictEqual(result.isSucc, true)

  })


})