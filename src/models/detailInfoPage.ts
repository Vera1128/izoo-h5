import _ from 'lodash'
import { getDetailInfo, changeCollectStatus } from 'apis/detailPageInfo'

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
    setCollectStatus(state, payload) {
      return {
        ...state,
        detailInfo: {
          ...state.detailInfo,
          isCollect: payload,
        },
      }
    },
  },
}
