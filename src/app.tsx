import React from 'react'
import { BrowserRouter, Router, Switch, Route, Redirect } from 'react-router-dom'
import ErrorBoundary from 'components/ErrorBoundary'
import routes from 'src/router'
import history from 'utils/history'
import sentry from 'utils/sentry'

// sentry 初始化
sentry?.SentryInit?.()

// 非生产环境启用vconsole，便于排错
if (APP_ENV === 'test') {
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
          console.log('props.match', props.match)
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
        props.history.listen((path) => {
          //  路由监听
          console.log('路由监听', path)
        })
        return <Component {...props} />
      }}
    />
  )
}

const createRoute = (routes) => <Switch>{routes.map((route, index) => createFixRoute(route, index))}</Switch>

const App = () => (
  <ErrorBoundary>
    <BrowserRouter basename={APP_BASENAME}>
      <Router children={createRoute(routes)} history={history} />
    </BrowserRouter>
  </ErrorBoundary>
)

export default App
