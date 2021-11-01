import asyncImport from 'router/asyncImport'

// 路由配置 - 使用动态加载的方式配置路由
export default [
  {
    path: '/index',
    component: asyncImport('index'),
    exact: true,
    children: [
      { path: '/mainPage', component: asyncImport('mainPage'), exact: true, redirect: true },
      { path: '/demo2', component: asyncImport('demo2'), exact: true },
      { path: '/demo3', component: asyncImport('demo3'), exact: true },
    ],
  },
  { component: asyncImport('404') },
]
