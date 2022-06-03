import assert from "assert"
import { TestApiClient } from "../../Base"

describe('ApiListenData', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('ListenData', async function () {
    let result = await apiClient.callApi('Center/ListenData', {})

    if(!result.isSucc) {
      console.error(result.err)
    }

    if (result.isSucc && result.res) {
      console.log('ListenData', result.res.list)
    }

    assert.strictEqual(result.isSucc, true)

  })


})