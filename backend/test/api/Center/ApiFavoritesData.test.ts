import assert from "assert"
import { TestApiClient } from "../../Base"

describe('ApiFavoritesData', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('FavoritesData', async function () {
    let result = await apiClient.callApi('Center/FavoritesData', {})

    if(!result.isSucc) {
      console.error(result.err)
    }

    if (result.isSucc && result.res) {
      console.log('FavoritesData', result.res.list)
    }

    assert.strictEqual(result.isSucc, true)

  })


})