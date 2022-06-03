/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2021-12-07 10:18:58
 * @LastEditTime: 2022-03-23 22:38:17
 */
import _ from 'lodash'
import { getTypeList, getTypeData } from 'apis/allRoutes'
import * as scheme from 'src/schemes'

export default {
  name: 'allRoutes',
  state: {
    typesArr: [],
    listArr: {},
    citySelectedId: 0,
    theme: 'city',
    showEmptyListImg: false,
    currentThemeName: '',
  },

  effects: (dispatch) => ({
    async getTypeList(type: scheme.TypeListParams, { allRoutes }) {
      const res = await getTypeList(type)
      if (res) {
        const {
          res: { list },
        } = res
        const listNotEmpty = list.filter((item) => item !== '')
        dispatch.allRoutes.setTypesArr(listNotEmpty)
        const { currentThemeName } = allRoutes
        let typeIndex = 0
        if (!currentThemeName) {
          dispatch.allRoutes.setCitySelectedId(0)
        } else {
          for (let i = 0; i < listNotEmpty.length; i++) {
            if (listNotEmpty[i] === currentThemeName) {
              typeIndex = i
              dispatch.allRoutes.setCitySelectedId(i)
              break
            }
          }
        }
        if (list.length > 0) {
          const listNew = {}
          list.forEach((item) => {
            listNew[item] = []
          })
          dispatch.allRoutes.setListArr(listNew)
          await dispatch.allRoutes.getTypeData({
            type,
            value: list[typeIndex],
          })
        }
      }
      console.log(res)
    },
    async getTypeData(data: scheme.TypeDataParams, { allRoutes }) {
      dispatch.allRoutes.setShowEmptyListImg(false)
      const res = await getTypeData(data)
      if (res) {
        const { list } = res.res
        if (list.length === 0) dispatch.allRoutes.setShowEmptyListImg(true)
        const listArrNew = _.cloneDeep(allRoutes.listArr)
        listArrNew[data.value] = list
        dispatch.allRoutes.setListArr(listArrNew)
      }
    },
  }),

  reducers: {
    setCitySelectedId(state, payload) {
      return {
        ...state,
        citySelectedId: payload,
      }
    },
    setCurrentThemeName(state, payload) {
      return {
        ...state,
        currentThemeName: payload,
      }
    },
    setTypesArr(state, payload) {
      return {
        ...state,
        typesArr: payload,
      }
    },
    setListArr(state, payload) {
      return {
        ...state,
        listArr: payload,
      }
    },
    setTheme(state, payload) {
      return {
        ...state,
        theme: payload,
      }
    },
    setShowEmptyListImg(state, payload) {
      return {
        ...state,
        showEmptyListImg: payload,
      }
    },
  },
}
