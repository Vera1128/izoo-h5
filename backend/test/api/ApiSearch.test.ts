import assert from "assert"
import { TestApiClient } from "../Base"

describe('ApiSearch', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('Search', async function () {
    let result = await apiClient.callApi('Search', {
      content: '北京市'
    })

    if(!result.isSucc) {
      console.error(result.err)
    }

    if (result.isSucc && result.res) {
      console.log('Search', result.res)
    }

    assert.strictEqual(result.isSucc, true)

  })


})