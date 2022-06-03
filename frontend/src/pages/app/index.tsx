/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2022-01-18 11:18:34
 * @LastEditTime: 2022-04-27 16:29:58
 */
import React, { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import wx from 'weixin-js-sdk'
import { getQueryParam } from 'utils/index'

import EventManager from 'src/modules/eventManager'
import { EventType } from 'src/modules/EventType'
import { AudioGlobal } from 'src/modules/audio'
import Loading from 'src/components/Loading'
import audioContinueIcon from 'assets/images/music-flow-icon.png'

import './index.scss'

const shareConfig = require('src/config/share.json')

const App: FC<any> = ({ children, getUserInfo, getSignature, history }) => {
  const [showPlayAudioIcon, setShowPlayAudioIcon] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  useEffect(() => {
    const appId = 'wxf93b23e8acb83eff'
    const code = getQueryParam('code')
    console.log('code', getQueryParam('code'))
    getUserInfo(code).then(() => {
      setShowLoading(false)
    })
    history.listen(async (path: any) => {
      if (path.pathname.indexOf('/detailInfoPage/') === -1 && path.pathname.indexOf('/group/') === -1) {
        // 微信分享配置
        getSignature(window.location.href.split('#')[0]).then(() => {
          wx.ready(() => {
            console.log('wx config ready')
            const shareInfo = {
              title: shareConfig.title,
              desc: shareConfig.subTitle,
              link: shareConfig.link,
              imgUrl: shareConfig.icon, // 分享图标
              fail: (res) => {
                console.log('设置失败信息', res)
              },
              success: (res) => {
                console.log('设置成功信息', res)
              },
            }
            wx.updateAppMessageShareData(shareInfo)
            wx.updateTimelineShareData(shareInfo)
          })
          wx.error((res: any) => {
            console.log('mainPage wx config error')
            console.log(res)
          })
        })
      }
    })

    // 音频播放配置
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

const mapDispatch = ({ base: { getUserInfo, getSignature } }) => ({
  getUserInfo,
  getSignature,
})

export default connect(mapState, mapDispatch)(App)
