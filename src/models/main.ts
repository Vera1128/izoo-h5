import { testLogin } from 'apis/api'

export default {
  name: 'main',
  state: {
    num: 0,
    offsetX: 0,
    userInfo: null,
  },

  effects: (dispatch) => ({
    async setNumAsync(payload, rootState) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      this.setNum(payload)
    },
    async getUserInfo() {
      console.log('请求')
      const res = await testLogin()
      console.log(res)
    },
  }),

  reducers: {
    setNum(state, payload) {
      return {
        ...state,
        num: payload,
      }
    },
    setOffsetX(state, payload) {
      return {
        ...state,
        offsetX: payload,
      }
    },
  },
}
