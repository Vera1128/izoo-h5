import assert from "assert"
import { TestApiClient } from "../../Base"

describe('ApiCatalogList', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('CatalogList', async function () {
    let result = await apiClient.callApi('Detail/CatalogList', {
      mainClassId: '618a9c920109e1ce065e5896'
    })

    if(!result.isSucc) {
      console.error(result.err)
    }

    if (result.isSucc && result.res) {
      console.log('CatalogList', result.res.list)
    }

    assert.strictEqual(result.isSucc, true)

  })


})