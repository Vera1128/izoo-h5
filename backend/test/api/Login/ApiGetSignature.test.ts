import assert from "assert"
import { TestApiClient } from "../../Base"

describe('ApiGetSignature', function () {
  let apiClient = new TestApiClient()

  before(async function () {
    await apiClient.login()
  })

  it('GetSignature', async function () {
    let result = await apiClient.callApi('Config/GetSignature', {
      url: 'http://localhost:9000/Config/GetSignature'
    })

    console.log('GetSignature', result)

    if (!result.isSucc) {
      console.error(result.err)
    }


    apiClient.callApi('Stat/ReportStat', {
      isFirstDay: false,
      action: '登录',
      data: {
        nickName: '董帅'
      }
    })

    assert.strictEqual(result.isSucc, true)

  })


})