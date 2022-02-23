import React, { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getQueryParam } from 'utils/index'

import EventManager from 'src/modules/eventManager'
import { EventType } from 'src/modules/EventType'
import { AudioGlobal } from 'src/modules/audio'
import Loading from 'src/components/Loading'

import audioContinueIcon from 'assets/images/music-flow-icon.png'

import './index.scss'

const App: FC<any> = ({ children, getUserInfo, match, location }) => {
  const [showPlayAudioIcon, setShowPlayAudioIcon] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
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
    getUserInfo(code).then(() => {
      setShowLoading(false)
    })
    let listener = null
    EventManager.on(
      EventType.AUDIO_PROGRESS_UPDATE,
      (listener = (progress) => {
        const progressValue: any = Object.values(progress)
        for (let i = 0; i < progressValue.length; i++) {
          if (progressValue[i].isPlay) {
            setShowPlayAudioIcon(true)
            return
          }
          setShowPlayAudioIcon(false)
        }
      }),
    )
    return () => {
      EventManager.off(EventType.AUDIO_PROGRESS_UPDATE, listener)
    }
  }, [])

  const closeAudioPlay = () => {
    AudioGlobal.getInstance().audioStop()
  }

  return (
    <div className="app">
      {showPlayAudioIcon && <img src={audioContinueIcon} className="audioContinueIcon" onClick={closeAudioPlay} />}
      {showLoading ? <Loading /> : children}
    </div>
  )
}

const mapState = ({ base: { userInfo } }) => ({
  userInfo,
})

const mapDispatch = ({ base: { getUserInfo } }) => ({
  getUserInfo,
})

export default connect(mapState, mapDispatch)(App)
