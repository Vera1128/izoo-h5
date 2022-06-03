import assert from "assert"
import { TestApiClient } from "../Base"

describe('ApiSearchHistory', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('SearchHistory', async function () {
    let result = await apiClient.callApi('SearchHistory', {
      action: 'get'
    })

    if (!result.isSucc) {
      console.error(result.err)
    }

    if (result.isSucc && result.res) {
      console.log('SearchHistory', result.res)
    }

    assert.strictEqual(result.isSucc, true)

  })


})