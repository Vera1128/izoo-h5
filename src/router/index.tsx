import asyncImport from 'router/asyncImport'

// 路由配置 - 使用动态加载的方式配置路由
export default [
  {
    path: '/index',
    component: asyncImport('index'),
    exact: true,
    children: [
      { path: '/mainPage', component: asyncImport('mainPage'), exact: true, redirect: true },
      { path: '/allRoutes', component: asyncImport('allRoutes'), exact: true },
      { path: '/personalCenter', component: asyncImport('personalCenter'), exact: true },
    ],
  },
  {
    path: '/detailInfoPage/:id',
    component: asyncImport('detailInfoPage'),
    exact: true,
  },
  {
    path: '/order/:type',
    component: asyncImport('orderPage'),
    exact: true,
  },
  {
    path: '/group/:id',
    component: asyncImport('groupPage'),
    exact: true,
  },
  {
    path: '/routeDetailPage',
    component: asyncImport('routeDetailPage'),
    exact: true,
  },
  {
    path: '/routeListPage',
    component: asyncImport('routeListPage'),
    exact: true,
  },
  { component: asyncImport('404') },
]
