/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2021-12-30 17:34:54
 * @LastEditTime: 2022-02-08 19:47:02
 */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { throttle } from 'src/utils'

import EventManager from 'src/modules/eventManager'
import { EventType } from 'src/modules/EventType'
import { AudioGlobal } from 'src/modules/audio'
import BackIcon from 'src/components/BackIcon'
import playIcon from 'assets/images/play-icon.png'
import pauseIcon from 'assets/images/pause-icon.png'
import izooIcon from 'assets/images/izoo-icon.png'
import './index.scss'

const RouteListPage = ({ history, match, getCatalogList, catalogList, setSubDetail, backFromRouteDetail }) => {
  const [playProgress, setPlayProgress] = useState({})
  const {
    params: { id },
  } = match
  useEffect(() => {
    if (!backFromRouteDetail) {
      getCatalogList(id)
      AudioGlobal.getInstance().audioStop()
    }
    let listener1 = null
    EventManager.on(
      EventType.AUDIO_PROGRESS_UPDATE,
      (listener1 = throttle((progress) => {
        setPlayProgress(progress)
      }, 300)),
    )
    return () => {
      EventManager.off(EventType.AUDIO_PROGRESS_UPDATE, listener1)
    }
  }, [])
  useEffect(() => {
    if (catalogList?.length > 0 && !backFromRouteDetail) {
      const audioList = []
      catalogList.forEach((item) => {
        if (item.isAudition) audioList.push(item)
      })
      AudioGlobal.getInstance().audiosInit(audioList)
    }
  }, [catalogList])
  const clickPlayAudio = (id) => {
    AudioGlobal.getInstance().audioPlay(id)
  }
  const backToDetailInfoPage = () => {
    history.go(-1)
  }
  const goToRouteDetail = (subId) => (e) => {
    setSubDetail({})
    history.push(`/routeDetailPage/${id}/${subId}`)
  }
  return (
    <div className="routeListPage">
      <BackIcon clickHandle={backToDetailInfoPage} />
      <div className="head">选择讲解条目</div>
      <div className="routeList">
        {(catalogList || []).map((catalog, index) => (
          <div className="routeListItem" onClick={goToRouteDetail(catalog.subId)} key={catalog.subId}>
            <img src={catalog.iconUri} className="routeCover" alt="封面图片" />
            <div className="num">{`0${index + 1}`.slice(-2)}</div>
            <div className="text">{catalog.title}</div>
            <img
              src={playProgress[catalog.subId]?.isPlay ? pauseIcon : playIcon}
              className="playIcon"
              // onClick={() => clickPlayAudio(catalog.subId)}
            />
          </div>
        ))}
        <img src={izooIcon} className="bottom-icon" />
      </div>
    </div>
  )
}

const mapState = ({ detailInfoPage: { catalogList, backFromRouteDetail } }) => ({
  catalogList,
  backFromRouteDetail,
})

const mapDispatch = ({ detailInfoPage: { getCatalogList, setSubDetail } }) => ({
  getCatalogList,
  setSubDetail,
})

export default connect(mapState, mapDispatch)(RouteListPage)
