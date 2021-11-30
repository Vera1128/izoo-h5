import * as scheme from 'src/schemes'
import { testLogin } from 'apis/api'
import { getCityData, getPopulerData, getScrollData, getTagsData, getNearbyData } from 'apis/main'

export default {
  name: 'main',
  state: {
    num: 0,
    offsetY: 0,
    userInfo: null,
    cityList: [], // 城市路线
    populerList: [], // 热门路线
    scrollList: [], // 轮播图
    themeList: [], // 行走主题
    nearbyList: [], // 附近的内容
  },

  effects: (dispatch) => ({
    // 测试登录
    async getUserInfo() {
      const res = await testLogin()
      console.log(res)
    },
    // 获取城市路线数据
    async getCityData() {
      const res = await getCityData()
      if (res) this.setCityList(res.res.list)
    },
    // 获取热门路线
    async getPopulerData() {
      const res = await getPopulerData()
      if (res) this.setPopulerList(res.res.list)
    },
    //  获取轮播图
    async getScrollData() {
      const res = await getScrollData()
      if (res) this.setScrollList(res.res.list)
    },
    //  获取行走主题
    async getTagsData() {
      const res = await getTagsData()
      if (res) this.setThemeList(res.res.list)
    },
    //  获取附近的内容
    async getNearbyData(props: scheme.NearbyParams) {
      const res = await getNearbyData(props)
      if (res) this.setNearbyList(res.res.list)
    },
  }),

  reducers: {
    setOffsetY(state, payload) {
      return {
        ...state,
        offsetY: payload,
      }
    },
    setCityList(state, payload) {
      return {
        ...state,
        cityList: payload,
      }
    },
    setPopulerList(state, payload) {
      return {
        ...state,
        populerList: payload,
      }
    },
    setScrollList(state, payload) {
      return {
        ...state,
        scrollList: payload,
      }
    },
    setThemeList(state, payload) {
      return {
        ...state,
        themeList: payload,
      }
    },
    setNearbyList(state, payload) {
      return {
        ...state,
        nearbyList: payload,
      }
    },
  },
}
