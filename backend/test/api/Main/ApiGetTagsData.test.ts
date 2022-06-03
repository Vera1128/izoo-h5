import assert from "assert"
import { TestApiClient } from "../../Base"

describe('ApiGetTagsData', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('GetTagsData', async function () {
    let result = await apiClient.callApi('Main/GetTagsData', {})


    if (!result.isSucc) {
      console.error(result.err)
    }

    if (result.isSucc && result.res) {
      console.log('GetTagsData', result.res.list)
    }

    assert.strictEqual(result.isSucc, true)

  })


})