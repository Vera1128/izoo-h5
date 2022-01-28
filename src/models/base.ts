import _ from 'lodash'
import wx from 'weixin-js-sdk'
import { testLogin, getSignature, prodLogin, ssoToFlow } from 'apis/api'

export default {
  name: 'base',
  state: {
    selectedId: 'mainPage',
    userInfo: {
      info: {},
      sso: '',
    },
  },

  effects: (dispatch) => ({
    // 测试登录
    async getUserInfo(code) {
      // 存在登录态,则略过
      if (localStorage.getItem('sso')) {
        return
      }
      const res = !code ? await testLogin() : await prodLogin(code)
      console.log('登录:', res)
      if (res) {
        ssoToFlow(res.res.sso)

        dispatch.base.setUserInfo(res.res)
        // @杨杨
        window.userInfo = res.res
        // @董帅
        localStorage.setItem('sso', res.res.sso)
        localStorage.setItem('userInfo', JSON.stringify(res.res.info))
      }
    },
    // 获取wxconfig
    async getSignature(url) {
      const res = await getSignature(url)
      console.log('wxconfig')
      console.log(res)
      if (res) {
        const {
          res: { appId, timestamp, nonceStr, signature, jsApiList },
        } = res
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId, // 必填，企业号的唯一标识，此处填写企业号corpid
          timestamp, // 必填，生成签名的时间戳
          nonceStr, // 必填，生成签名的随机串
          signature, // 必填，签名，见附录1
          jsApiList: [...jsApiList, 'updateAppMessageShareData', 'updateTimelineShareData'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
      }
    },
  }),

  reducers: {
    setSelectedId(state, payload) {
      return {
        ...state,
        selectedId: payload,
      }
    },
    setUserInfo(state, payload) {
      return {
        ...state,
        userInfo: payload,
      }
    },
  },
}
