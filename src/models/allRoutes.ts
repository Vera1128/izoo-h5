import { getTypeList, getTypeData } from 'apis/allRoutes'
import * as scheme from 'src/schemes'

export default {
  name: 'allRoutes',
  state: {
    typesArr: [],
    listArr: [],
    citySelectedId: 0,
  },

  effects: (dispatch) => ({
    async getTypeList(type: scheme.TypeListParams) {
      const res = await getTypeList(type)
      if (res) {
        const {
          res: { list },
        } = res
        dispatch.allRoutes.setTypesArr(list)
        dispatch.allRoutes.setCitySelectedId(0)
        if (list.length > 0) {
          dispatch.allRoutes.getTypeData({
            type,
            value: list[0],
          })
        }
      }
      console.log(res)
    },
    async getTypeData(data: scheme.TypeDataParams) {
      const res = await getTypeData(data)
      console.log(res)
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
  },
}
