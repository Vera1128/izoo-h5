import React from 'react'
import { HashRouter, Router, Switch, Route, Redirect } from 'react-router-dom'
import ErrorBoundary from 'components/ErrorBoundary'
import routes from 'src/router'
import history from 'utils/history'
import sentry from 'utils/sentry'
import { getCurrentUser } from './apis/api'

// sentry 初始化
sentry?.SentryInit?.()

// 非生产环境启用vconsole，便于排错
if (APP_ENV === 'prod') {
  const VConsole = require('vconsole')
  /* eslint-disable no-new */
  new VConsole()
}

// 该组件通过递归的方式，将所有route中带有children路由的父路由进行解构,最终用createBasicRoute函数来渲染
const createFixRoute = (route, index) => {
  const { path, component: RouteComponent, children } = route
  if (children) {
    return (
      <Route
        key={index}
        path={path}
        children={(props) => {
          let redirectPath = null
          return (
            <RouteComponent {...props}>
              <Switch>
                {children.map((child, index2) => {
                  const { path: childPath, redirect } = child
                  if (redirect) {
                    redirectPath = childPath
                  }
                  return createFixRoute({ ...child, path: path + childPath }, `${index}-${index2}`)
                })}
                <Redirect from={`${path}`} to={`${path}${redirectPath || children[0].path}`} />
              </Switch>
            </RouteComponent>
          )
        }}
      />
    )
  }
  return createBasicRoute(route, index)
}

const createBasicRoute = (route, index) => {
  const { path, component: Component } = route
  return (
    <Route
      exact
      key={index}
      path={path}
      component={(props) => {
        console.log(props)
        return <Component {...props} />
      }}
    />
  )
}

const createRoute = (routes) => <Switch>{routes.map((route, index) => createFixRoute(route, index))}</Switch>

const App = () => (
  <ErrorBoundary>
    <HashRouter>
      {/* <Redirect from="/" to="/index" /> */}
      <Switch>{createRoute(routes)}</Switch>
    </HashRouter>
  </ErrorBoundary>
)

export default App
