import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { getQueryParam } from 'utils/index'

import './index.scss'

const App: FC<any> = ({ children, getUserInfo }) => {
  console.log('app')
  useEffect(() => {
    const appId = 'wxf93b23e8acb83eff'
    const code = getQueryParam('code')
    console.log('code', getQueryParam('code'))
    // if (!code) {
    //   localStorage.removeItem('code')
    //   window.location.replace(
    //     `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
    //       window.location.href,
    //     )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`,
    //   )
    // }
    // localStorage.setItem('code', getQueryParam('code'))
    getUserInfo(code)
  }, [])

  return <div className="app">{children}</div>
}

const mapState = ({ base: { userInfo } }) => ({
  userInfo,
})

const mapDispatch = ({ base: { getUserInfo } }) => ({
  getUserInfo,
})

export default connect(mapState, mapDispatch)(App)
