import React, { useState } from 'react'
import focusIcon from 'assets/images/focus-icon.png'
import closeIcon from 'assets/images/close-icon.png'
import './index.less'

interface Props {
  className?: string
}

function FocusOn(props: Props) {
  const [closeFocusPanel, setCloseFocusPanel] = useState(false)
  return (
    <>
      {!closeFocusPanel && (
        <div className={`focusOn ${props.className}`}>
          <img src={focusIcon} className="focusIcon" alt="公众号图标" />
          <div className="focusTextContent">
            <p className="focusTitle">爱走星球</p>
            <p className="focusSubTitle">关注服务号，更容易找到我们</p>
          </div>
          <div className="focusBtn">立即关注</div>
          <img
            src={closeIcon}
            className="closeIcon"
            alt="关闭图标"
            role="presentation"
            onClick={() => setCloseFocusPanel(true)}
          />
        </div>
      )}
    </>
  )
}

FocusOn.defaultProps = {
  className: '',
} as Partial<Props>

export default FocusOn
