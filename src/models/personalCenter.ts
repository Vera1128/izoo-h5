/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2021-12-20 10:24:44
 * @LastEditTime: 2022-03-21 15:58:06
 */
import _ from 'lodash'
import { getFavoritesList, getListenList, getOrderList } from 'apis/personalCenter'

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
    async getOrderList() {
      const res = await getOrderList()
      if (res) {
        const {
          res: { list },
        } = res
        dispatch.personalCenter.setOrderList(list)
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
    setOrderList(state, payload) {
      return {
        ...state,
        orderList: payload,
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
