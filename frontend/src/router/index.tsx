/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2021-11-22 10:16:00
 * @LastEditTime: 2022-03-14 21:14:15
 */
import asyncImport from 'router/asyncImport'

// 路由配置 - 使用动态加载的方式配置路由
export default [
  {
    path: '/test',
    component: asyncImport('test'),
    exact: true,
  },
  {
    path: '/',
    component: asyncImport('app'),
    exact: true,
    children: [
      {
        path: 'index',
        component: asyncImport('index'),
        exact: true,
        redirect: true,
        children: [
          { path: '/mainPage', component: asyncImport('mainPage'), exact: true, redirect: true },
          { path: '/allRoutes', component: asyncImport('allRoutes'), exact: true },
          { path: '/personalCenter', component: asyncImport('personalCenter'), exact: true },
        ],
      },
      {
        path: 'detailInfoPage/:id',
        component: asyncImport('detailInfoPage'),
        exact: true,
      },
      {
        path: 'order/:type',
        component: asyncImport('orderPage'),
        exact: true,
      },
      {
        path: 'group/:id/:groupId',
        component: asyncImport('groupPage'),
        exact: true,
      },
      {
        path: 'routeDetailPage/:mainClassId/:subId',
        component: asyncImport('routeDetailPage'),
        exact: true,
      },
      {
        path: 'routeListPage/:id',
        component: asyncImport('routeListPage'),
        exact: true,
      },
    ],
  },

  { component: asyncImport('404') },
]
