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
    path: '/order/:id',
    component: asyncImport('orderPage'),
    exact: true,
  },
  { component: asyncImport('404') },
]
