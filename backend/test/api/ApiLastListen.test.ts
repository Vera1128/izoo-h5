import assert from "assert"
import { TestApiClient } from "../Base"

describe('ApiLastListen', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('LastListen', async function () {
    let result = await apiClient.callApi('LastListen', {})

    if(!result.isSucc) {
      console.error(result.err)
    }

    if (result.isSucc && result.res) {
      console.log('LastListen', result.res)
    }

    assert.strictEqual(result.isSucc, true)

  })


})