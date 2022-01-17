import _ from 'lodash'
import { getSearchHistory, search } from 'apis/search'

export default {
  name: 'search',
  state: {
    history: [],
    hot: [],
    list: [],
    searchWord: '',
    inputFocus: false,
    showCancleText: false,
    showSearchRes: false,
    showRightButton: true,
  },

  effects: (dispatch) => ({
    // 获取搜索记录
    async getSearchHistory() {
      const res = await getSearchHistory()
      if (res) {
        const {
          res: { history, hot },
        } = res
        dispatch.search.setHistory(history)
        dispatch.search.setHot(hot)
      }
    },
    async search(content) {
      const res = await search(content)
      if (res) {
        dispatch.search.setSearchResList(res.res.list)
      }
    },
  }),

  reducers: {
    setHistory(state, payload) {
      return {
        ...state,
        history: payload,
      }
    },
    setHot(state, payload) {
      return {
        ...state,
        hot: payload,
      }
    },
    setSearchResList(state, payload) {
      return {
        ...state,
        list: payload,
      }
    },
    setSearchWord(state, payload) {
      return {
        ...state,
        searchWord: payload,
      }
    },
    setInputFocus(state, payload) {
      return {
        ...state,
        inputFocus: payload,
      }
    },
    setShowCancleText(state, payload) {
      return {
        ...state,
        showCancleText: payload,
      }
    },
    setShowSearchRes(state, payload) {
      return {
        ...state,
        showSearchRes: payload,
      }
    },
    setShowRightButton(state, payload) {
      return {
        ...state,
        showRightButton: payload,
      }
    },
  },
}
