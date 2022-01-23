import React, { useState, useRef, useEffect } from 'react'
import Hammer from 'hammerjs'
import { connect } from 'react-redux'
import sf from 'seconds-formater'
import BackIcon from 'components/BackIcon'
import EventManager from 'src/modules/eventManager'
import { EventType } from 'src/modules/EventType'
import { AudioGlobal } from 'src/modules/audio'
import { throttle, formatNum } from 'src/utils'
import placeIcon from 'assets/images/place-icon.png'
import playIcon from 'assets/images/play-icon-bold.png'
import pauseIcon from 'assets/images/pause-icon.png'
import './index.scss'

const RouteDetailPage = ({ history, match, subDetail, getSubDetail, catalogList, setBackFromRouteDetail }) => {
  const [targetImg, setTargetImg] = useState('')
  const [showPreviewImg, setShowPreviewImg] = useState(false)
  const [playProgress, setPlayProgress] = useState({})
  const largeImgEl = useRef(null)
  const {
    params: { mainClassId, subId },
  } = match

  useEffect(() => {
    getSubDetail({ mainClassId, subId })
    let listener = null
    EventManager.on(
      EventType.AUDIO_PROGRESS_UPDATE,
      (listener = throttle((progress) => {
        setPlayProgress(progress)
      }, 1000)),
    )
    return () => {
      EventManager.off(EventType.AUDIO_PROGRESS_UPDATE, listener)
    }
  }, [])

  useEffect(() => {
    if (largeImgEl.current) {
      const largeImgDom = largeImgEl.current
      const mc = new Hammer.Manager(largeImgDom)
      const Pinch = new Hammer.Pinch()
      const Pan = new Hammer.Pan()
      const Tap = new Hammer.Tap()
      mc.add(Pinch)
      mc.add(Pan)
      mc.add(Tap)
      mc.on('pinch', (e) => {
        const { scale } = e
        // if (scale < 1) return
        largeImgDom.style.scale = scale
      })
      let x = 0
      let y = 0
      mc.on('panmove', (e) => {
        const { deltaX, deltaY } = e
        const targetStyle = largeImgDom.style
        targetStyle.webkitTransform =
          targetStyle.MsTransform =
          targetStyle.msTransform =
          targetStyle.MozTransform =
          targetStyle.OTransform =
          targetStyle.transform =
            `translate3d(${deltaX + x}px, ${deltaY + y}px, 0)`
      })
      mc.on('panend', (e) => {
        const { deltaX, deltaY } = e
        x = deltaX + x
        y = deltaY + y
      })
      mc.on('tap', () => {
        largeImgDom.style.scale = 1
        const targetStyle = largeImgDom.style
        targetStyle.webkitTransform =
          targetStyle.MsTransform =
          targetStyle.msTransform =
          targetStyle.MozTransform =
          targetStyle.OTransform =
          targetStyle.transform =
            `translate3d(0, 0, 0)`
      })
    }
  }, [largeImgEl.current])

  const showPreviewHandle = (img) => () => {
    setShowPreviewImg(true)
    setTargetImg(img)
  }

  const closePreviewHandle = (e) => {
    if (Array.from(e.target.classList).includes('largeImgPanel')) setShowPreviewImg(false)
  }

  const backToDetailListPage = () => {
    setBackFromRouteDetail(true)
    history.go(-1)
  }

  const clickPlayAudio = (id) => {
    AudioGlobal.getInstance().audioPlay(id)
  }

  const goToPreRouteDetail = () => {
    const { index } = subDetail
    if (index === 0) return
    const preIndex = index - 1
    history.replace(`/routeDetailPage/${mainClassId}/${catalogList[preIndex].subId}`)
  }

  const goToNextRouteDetail = () => {
    const { index } = subDetail
    if (index === catalogList.length - 1) return
    const nextIndex = index + 1
    history.replace(`/routeDetailPage/${mainClassId}/${catalogList[nextIndex].subId}`)
  }

  return (
    <div className="routeDetailPage">
      <BackIcon clickHandle={backToDetailListPage} />
      <img src={subDetail.imagesList && subDetail.imagesList[0]} className="mainImg" />
      <div className="locationContainer">
        <img src={placeIcon} className="placeIcon" />
        <p className="locationDesc">{subDetail.address}</p>
      </div>
      <div className="contentContainer">
        <div className="audioContainer">
          <div className="audioTitleContainer">
            <span className="routeIndex">{`${formatNum(subDetail.index + 1)}/${formatNum(catalogList.length)}`}</span>
            <p className="subTitle">{subDetail.subTitle}</p>
            <img
              src={playProgress[subId]?.isPlay ? pauseIcon : playIcon}
              className="playIcon"
              onClick={() => clickPlayAudio(subId)}
            />
          </div>
          <div className="audioProgress">
            <span className="currrent">
              {sf.convert(Math.round(playProgress[subId]?.currentTime || 0)).format('MM:SS')}
            </span>
            <div className="progressContainer">
              <div className="progressBar" style={{ width: playProgress[subId]?.progress || 0 }} />
              <div className="progressDot" style={{ left: playProgress[subId]?.progress || 0 }} />
            </div>
            <span className="duration">{sf.convert(Math.round(subDetail.duration || 0)).format('MM:SS')}</span>
          </div>
        </div>
        <div className="smallImgContainer">
          {subDetail.extraImagesList?.map((image) => (
            <img key={image} src={image} className="smallImg" onClick={showPreviewHandle(image)} />
          ))}
        </div>
      </div>
      {showPreviewImg && (
        <div className="largeImgPanel" onClick={closePreviewHandle}>
          <img src={targetImg} className="largeImg" ref={largeImgEl} />
        </div>
      )}
      <div className="menu">
        <div
          className="menuItem"
          style={{ visibility: subDetail.index === 0 ? 'hidden' : 'visible' }}
          onClick={goToPreRouteDetail}
        >
          上一处
        </div>
        <div className="menuItem" onClick={backToDetailListPage}>
          返回目录
        </div>
        <div
          className="menuItem"
          style={{ visibility: subDetail.index === catalogList.length - 1 ? 'hidden' : 'visible' }}
          onClick={goToNextRouteDetail}
        >
          下一处
        </div>
      </div>
    </div>
  )
}

const mapState = ({ detailInfoPage: { subDetail, catalogList } }) => ({
  subDetail,
  catalogList,
})

const mapDispatch = ({ detailInfoPage: { getSubDetail, setBackFromRouteDetail } }) => ({
  getSubDetail,
  setBackFromRouteDetail,
})

export default connect(mapState, mapDispatch)(RouteDetailPage)
