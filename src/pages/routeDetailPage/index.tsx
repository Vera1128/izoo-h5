import React, { useState, useRef, useEffect } from 'react'
import Hammer from 'hammerjs'
import { connect } from 'react-redux'
import BackIcon from 'components/BackIcon'
import placeIcon from 'assets/images/place-icon.png'
import './index.scss'

const RouteDetailPage = ({ history, match, subDetail, getSubDetail }) => {
  const [targetImg, setTargetImg] = useState('')
  const [showPreviewImg, setShowPreviewImg] = useState(false)
  const largeImgEl = useRef(null)
  const {
    params: { mainClassId, subId },
  } = match

  useEffect(() => {
    getSubDetail({ mainClassId, subId })
  }, [])

  useEffect(() => {
    console.log('初始化')
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
    history.go(-1)
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
        <div className="audioContainer">1</div>
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
        <div className="menuItem">上一处</div>
        <div className="menuItem" onClick={backToDetailListPage}>
          返回目录
        </div>
        <div className="menuItem">下一处</div>
      </div>
    </div>
  )
}

const mapState = ({ detailInfoPage: { subDetail } }) => ({
  subDetail,
})

const mapDispatch = ({ detailInfoPage: { getSubDetail } }) => ({
  getSubDetail,
})

export default connect(mapState, mapDispatch)(RouteDetailPage)