import assert from "assert"
import { TestApiClient } from "../../Base"

describe('ApiGetPopulerData', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('GetPopulerData', async function () {
    let result = await apiClient.callApi('Main/GetPopulerData', {})

    if (result.isSucc && result.res) {
      console.log('GetPopulerData', result.res.list)
    }
    
    if(!result.isSucc) {
      console.error(result.err)
    }

    assert.strictEqual(result.isSucc, true)

  })


})