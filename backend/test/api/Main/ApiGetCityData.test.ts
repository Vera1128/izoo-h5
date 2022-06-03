import assert from "assert"
import { TestApiClient } from "../../Base"

describe('ApiGetCityData', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('GetCityData', async function () {
    let result = await apiClient.callApi('Main/GetCityData', {})

    if (result.isSucc && result.res) {
      console.log('GetCityData', result.res.list)
    }

    if(!result.isSucc) {
      console.error(result.err)
    }

    assert.strictEqual(result.isSucc, true)

  })


})