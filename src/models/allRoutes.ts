import SwiperTestImg from 'assets/images/swiper-test.png'

export default {
  name: 'allRoutes',
  state: {
    citiesArr: [
      {
        id: 0,
        name: '上海',
        list: new Array(10).fill({
          id: new Date().getTime(),
          imgSrc: SwiperTestImg,
          desc: '聚焦中国经济发展聚焦中国经济发展聚焦中国经济发展',
          tagList: ['科学发展', '文学艺术'],
          name: '沪港银行历史展览馆',
          location: '上海',
        }),
      },
      {
        id: 1,
        name: '北京',
        list: new Array(3).fill({
          id: new Date().getTime(),
          imgSrc: SwiperTestImg,
          desc: '聚焦中国经济发展',
          tagList: ['科学发展', '文学艺术'],
          name: '沪港银行历史展览馆',
          location: '上海',
        }),
      },
      {
        id: 2,
        name: '杭州',
        list: [],
      },
      {
        id: 3,
        name: '苏州',
        list: [],
      },
    ],
    citySelectedId: 0,
  },

  effects: (dispatch) => ({}),

  reducers: {
    setCitySelectedId(state, payload) {
      return {
        ...state,
        citySelectedId: payload,
      }
    },
  },
}
