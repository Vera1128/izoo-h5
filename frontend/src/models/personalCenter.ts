/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2021-12-20 10:24:44
 * @LastEditTime: 2022-05-14 21:26:13
 */
import _ from 'lodash'
import { getFavoritesList, getListenList, getOrderList, getCouponList } from 'apis/personalCenter'

export default {
  name: 'personalCenter',
  state: {
    orderList: [],
    favoritesList: [],
    listenList: [],
    menuIndex: 0,
    couponList: [],
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
    async getCouponList() {
      const res = await getCouponList()
      if (res) {
        const {
          res: { list },
        } = res
        dispatch.personalCenter.setCouponList(list.filter((coupon) => coupon.state !== 'used'))
        return list
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
    setCouponList(state, payload) {
      return {
        ...state,
        couponList: payload,
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
