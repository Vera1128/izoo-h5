import assert from "assert"
import { TestApiClient } from "../../Base"

describe('ApiGroupData', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('GroupData', async function () {
    let result = await apiClient.callApi('Order/GroupData', {
      groupId: '61b99e211f1a0d67eca89781'
    })

    if(!result.isSucc) {
      console.error(result.err)
    }

    if (result.isSucc && result.res) {
      console.log('GroupData', result.res)
    }

    assert.strictEqual(result.isSucc, true)

  })


})