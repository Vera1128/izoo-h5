import React, { useState } from 'react'
import InterceptPopup from 'components/InterceptPopup'
import focusIcon from 'assets/images/focus-icon.png'
import closeIcon from 'assets/images/close-icon.png'
import './index.less'

interface Props {
  className?: string
  showCloseIcon?: boolean
}

function FocusOn(props: Props) {
  const [closeFocusPanel, setCloseFocusPanel] = useState(false)
  const [showInterceptPopup, setShowInterceptPopup] = useState(false)
  return (
    <>
      {!closeFocusPanel && (
        <div className={`focusOn ${props.className}`}>
          <img src={focusIcon} className="focusIcon" alt="公众号图标" />
          <div className="focusTextContent">
            <p className="focusTitle">爱走星球</p>
            <p className="focusSubTitle">关注服务号，更容易找到我们</p>
          </div>
          <div
            className={`focusBtn ${!props.showCloseIcon ? 'focusBtnCenter' : ''}`}
            onClick={() => setShowInterceptPopup(true)}
          >
            立即关注
          </div>
          {props.showCloseIcon && (
            <img
              src={closeIcon}
              className="closeIcon"
              alt="关闭图标"
              role="presentation"
              onClick={() => setCloseFocusPanel(true)}
            />
          )}
          {showInterceptPopup && (
            <InterceptPopup onClickHandle={() => setShowInterceptPopup(false)}>
              <p className="popupText">
                为了保存您的订单信息 <br />
                请先一键关注服务号
              </p>
            </InterceptPopup>
          )}
        </div>
      )}
    </>
  )
}

FocusOn.defaultProps = {
  className: '',
  showCloseIcon: true,
} as Partial<Props>

export default FocusOn
