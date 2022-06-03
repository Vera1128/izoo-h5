import assert from "assert"
import { TestApiClient } from "../../Base"

describe('ApiNearbyData', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('NearbyData', async function () {
    let result = await apiClient.callApi('Main/NearbyData', {
      longitude: '121.62',
      latitude: '31.219'
    })

    if(!result.isSucc) {
      console.error(result.err)
    }

    if (result.isSucc && result.res) {
      console.log('NearbyData', result.res.list)
    }


    assert.strictEqual(result.isSucc, true)

  })


})