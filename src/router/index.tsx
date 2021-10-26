import asyncImport from 'router/asyncImport'

// 路由配置 - 使用动态加载的方式配置路由
export default [
  { path: '/', component: asyncImport('index'), exact: true },
  { path: '/demo', component: asyncImport('demo'), exact: true },
  { component: asyncImport('404') },
]
