import assert from "assert";
import { TestApiClient } from "../../Base";

describe('ApiGetOrderData', function () {

  let apiClient = new TestApiClient();

  before(async function () {
    await apiClient.login()
  })

  it('GetOrderData', async function () {
    let result = await apiClient.callApi('Center/OrderData', {})

    if (!result.isSucc) {
      console.log(result.err)
    }

    if (result.isSucc && result.res) {
      console.log('GetOrderData', result.res.list)
    }

    assert.strictEqual(result.isSucc, true)

  })

})