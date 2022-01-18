import _ from 'lodash'
import { getFavoritesList, getListenList } from 'apis/personalCenter'

export default {
  name: 'personalCenter',
  state: {
    orderList: [],
    favoritesList: [],
    listenList: [],
    menuIndex: 0,
  },

  effects: (dispatch) => ({
    async getFavoritesList() {
      const res = await getFavoritesList()
      if (res) {
        const {
          res: { list },
        } = res
        dispatch.personalCenter.setFavoritesList(list)
      }
    },
    async getListenList() {
      const res = await getListenList()
      if (res) {
        const {
          res: { list },
        } = res
        if (list.length > 0) {
          list.splice(1, 0, null)
        }
        dispatch.personalCenter.setListenList(list)
      }
    },
  }),

  reducers: {
    setFavoritesList(state, payload) {
      return {
        ...state,
        favoritesList: payload,
      }
    },
    setListenList(state, payload) {
      return {
        ...state,
        listenList: payload,
      }
    },
    setMenuIndex(state, payload) {
      return {
        ...state,
        menuIndex: payload,
      }
    },
  },
}
