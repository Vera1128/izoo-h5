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
      const catalogListRes = await getCatalogList(mainClassId)
      const subDetailRes = await getSubDetail({ mainClassId, subId })
      if (catalogListRes && subDetailRes) {
        const {
          res: { list: catalogList },
        } = catalogListRes
        const { res: subDetail } = subDetailRes
        let subDetailNew: any = { ...subDetail }
        dispatch.detailInfoPage.setCatalogList(catalogList)
        for (let i = 0; i < catalogList.length; i++) {
          if (catalogList[i].subId === subId) {
            subDetailNew = {
              ...subDetailNew,
              duration: catalogList[i].duration,
              index: i,
            }
            break
          }
        }
        dispatch.detailInfoPage.setSubDetail(subDetailNew)
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
