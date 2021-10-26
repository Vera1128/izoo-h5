import React from 'react'
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom'
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

const App = () => (
  <ErrorBoundary>
    <BrowserRouter basename={APP_BASENAME}>
      <Router history={history}>
        <Switch>
          {routes.map((props: any, key) => <Route key={key} {...props} />)}
        </Switch>
      </Router>
    </BrowserRouter>
  </ErrorBoundary>
)

export default App
