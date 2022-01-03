import React, { useState, useRef, useEffect } from 'react'
import Hammer from 'hammerjs'
import BackIcon from 'components/BackIcon'
import test1 from 'assets/test-image/1.png'
import test2 from 'assets/test-image/2.png'
import placeIcon from 'assets/images/place-icon.png'
import './index.scss'

const RouteDetailPage = ({ history }) => {
  console.log('routeDetailPage')
  const [targetImg, setTargetImg] = useState(test1)
  const [showPreviewImg, setShowPreviewImg] = useState(false)
  const largeImgEl = useRef(null)

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
      <img src={test1} className="mainImg" />
      <div className="locationContainer">
        <img src={placeIcon} className="placeIcon" />
        <p className="locationDesc">从武康大楼沿武康路前行从武康大楼沿武康路前行从武康大楼沿武康路前行</p>
      </div>
      <div className="contentContainer">
        <div className="audioContainer">1</div>
        <div className="smallImgContainer">
          <img src={test1} className="smallImg" onClick={showPreviewHandle(test1)} />
          <img src={test2} className="smallImg" onClick={showPreviewHandle(test2)} />
          <img src={test1} className="smallImg" onClick={showPreviewHandle(test1)} />
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

export default RouteDetailPage
