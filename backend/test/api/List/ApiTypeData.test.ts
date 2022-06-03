import assert from "assert"
import { TestApiClient } from "../../Base"

describe('ApiTypeData', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('TypeData', async function () {
    let result = await apiClient.callApi('List/TypeData', {
      type: 'tag',
      value: '社会经济'
    })

    if(!result.isSucc) {
      console.error(result.err)
    }

    if (result.isSucc && result.res) {
      console.log('TypeData', result.res.list)
    }

    assert.strictEqual(result.isSucc, true)

  })


})