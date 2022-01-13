import _ from 'lodash'
import { getDetailInfo, getCatalogList, getSubDetail } from 'apis/detailPageInfo'

export default {
  name: 'detailInfoPage',
  state: {
    detailInfo: {},
    catalogList: [],
    subDetail: {},
  },

  effects: (dispatch) => ({
    async getDetailInfo(id) {
      const res = await getDetailInfo(id)
      if (res) {
        dispatch.detailInfoPage.setDetailInfo(res.res)
      }
    },
    async getCatalogList(id) {
      const res = await getCatalogList(id)
      if (res) {
        dispatch.detailInfoPage.setCatalogList(res.res.list)
      }
    },
    async getSubDetail({ mainClassId, subId }) {
      const res = await getSubDetail({ mainClassId, subId })
      if (res) {
        dispatch.detailInfoPage.setSubDetail(res.res)
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
    setSubDetail(state, payload) {
      return {
        ...state,
        subDetail: payload,
      }
    },
    setCatalogList(state, payload) {
      return {
        ...state,
        catalogList: payload,
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
