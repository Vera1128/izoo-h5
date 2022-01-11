import _ from 'lodash'

export default {
  name: 'base',
  state: {
    selectedId: 'mainPage',
  },

  effects: (dispatch) => ({}),

  reducers: {
    setSelectedId(state, payload) {
      return {
        ...state,
        selectedId: payload,
      }
    },
  },
}
