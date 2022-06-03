import assert from "assert"
import { TestApiClient } from "../Base"

describe('ApiListenReport', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('ListenReport', async function () {
    let result = await apiClient.callApi('ListenReport', {
      mainClassId: '618a9c920109e1ce065e5896',
      subId: '61ac5e445354ff3f472ae9cf',
      duration: 100
    })

    if(!result.isSucc) {
      console.error(result.err)
    }

    if (result.isSucc && result.res) {
      console.log('ListenReport', result.res)
    }

    assert.strictEqual(result.isSucc, true)

  })


})