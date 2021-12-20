import React from 'react'
import Qrcode from 'assets/images/qrcode.png'
import './index.scss'

const InterceptPopup = ({ children, onClickHandle }) => {
  const onPopupClick = (e) => {
    if (!Array.from(e.target.classList).includes('interceptPopup')) return
    onClickHandle()
  }
  return (
    <div className="interceptPopup" onClick={onPopupClick}>
      <div className="interceptPopupContent">
        <img src={Qrcode} className="qrcode" />
        <p className="popupTitle">
          长按二维码关注 <span>爱走星球</span> 服务号
        </p>
        {children}
      </div>
    </div>
  )
}

InterceptPopup.defaultProps = {}

export default InterceptPopup
