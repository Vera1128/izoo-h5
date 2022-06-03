import assert from "assert"
import { TestApiClient } from "../../Base"

describe('ApiCollect', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('Collect', async function () {
    let result = await apiClient.callApi('Detail/CollectEvent', {
      mainClassId: '618a9c920109e1ce065e5896'
    })

    if(!result.isSucc) {
      console.error(result.err)
    }

    if (result.isSucc && result.res) {
      console.log('Collect_info', result.res.state)
    }

    assert.strictEqual(result.isSucc, true)

  })


})