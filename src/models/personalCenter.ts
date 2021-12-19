import _ from 'lodash'
import { getFavoritesList, getListenList } from 'apis/personalCenter'

export default {
  name: 'personalCenter',
  state: {
    favoritesList: [],
    listenList: [],
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
        console.log('++++')
        console.log(res)
        // const {
        //     res: { list },
        //   } = res
        // dispatch.personalCenter.setListenList(list)
      }
    },
  }),

  reducers: {
    setFavoritesList(state, payload) {
      return {
        state,
        favoritesList: payload,
      }
    },
    setListenList(state, payload) {
      return {
        state,
        listenList: payload,
      }
    },
  },
}
