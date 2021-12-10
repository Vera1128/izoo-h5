import _ from 'lodash'
import { getDetailInfo } from 'apis/detailPageInfo'

export default {
  name: 'detailInfoPage',
  state: {
    detailInfo: {},
  },

  effects: (dispatch) => ({
    async getDetailInfo(id) {
      const res = await getDetailInfo(id)
      if (res) {
        dispatch.detailInfoPage.setDetailInfo(res.res)
      }
    },
  }),

  reducers: {
    setDetailInfo(state, payload) {
      return {
        ...state,
        detailInfo: payload,
      }
    },
  },
}
