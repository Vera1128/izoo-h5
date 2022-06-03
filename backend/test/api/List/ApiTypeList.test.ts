import assert from "assert"
import { TestApiClient } from "../../Base"

describe('ApiTypeList', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('TypeList', async function () {
    let result = await apiClient.callApi('List/TypeList', {
      type: 'city'
      // type: 'tag'
    })

    if (!result.isSucc) {
      console.error(result.err)
    }

    if (result.isSucc && result.res) {
      console.log('TypeList', result.res.list)
    }

    assert.strictEqual(result.isSucc, true)

  })


})