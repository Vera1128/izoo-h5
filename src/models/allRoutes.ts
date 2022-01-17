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
  },

  effects: (dispatch) => ({
    async getTypeList(type: scheme.TypeListParams) {
      const res = await getTypeList(type)
      if (res) {
        const {
          res: { list },
        } = res
        const listNotEmpty = list.filter((item) => item !== '')
        dispatch.allRoutes.setTypesArr(listNotEmpty)
        dispatch.allRoutes.setCitySelectedId(0)
        if (list.length > 0) {
          const listNew = {}
          list.forEach((item) => {
            listNew[item] = []
          })
          dispatch.allRoutes.setListArr(listNew)
          dispatch.allRoutes.getTypeData({
            type,
            value: list[0],
          })
        }
      }
      console.log(res)
    },
    async getTypeData(data: scheme.TypeDataParams, { allRoutes }) {
      const res = await getTypeData(data)
      if (res) {
        const listArrNew = _.cloneDeep(allRoutes.listArr)
        listArrNew[data.value] = res.res.list
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
  },
}
