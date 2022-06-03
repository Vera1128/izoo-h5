import React, { useState, useEffect } from 'react'
import focusIcon from 'assets/images/focus-icon.png'
import closeIcon from 'assets/images/close-icon.png'
import { showFocusPanel } from './focusPanelIndex'
import './index.less'

interface Props {
  showCloseIcon?: boolean
  type?: number
  closeCallback?: () => void
}

function FocusOn(props: Props) {
  const [closeFocusPanel, setCloseFocusPanel] = useState(false)
  const [showInterceptPopup, setShowInterceptPopup] = useState(false)
  useEffect(() => {
    if (showInterceptPopup) {
      showFocusPanel(props.type)
    }
  }, [showInterceptPopup])
  return (
    <>
      {!closeFocusPanel && (
        <div className="focusOn">
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
              onClick={() => {
                setCloseFocusPanel(true)
                props?.closeCallback()
              }}
            />
          )}
        </div>
      )}
    </>
  )
}

FocusOn.defaultProps = {
  showCloseIcon: true,
  type: 1,
  closeCallback: () => {},
} as Partial<Props>

export default FocusOn
