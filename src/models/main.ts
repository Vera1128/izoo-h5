export default {
  name: 'main',
  state: {
    num: 0,
    offsetX: 0,
  },

  effects: (dispatch) => ({
    async setNumAsync(payload, rootState) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      this.setNum(payload)
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
