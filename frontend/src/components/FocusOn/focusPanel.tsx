import React from 'react'
import InterceptPopup from 'components/InterceptPopup'
import './focusPanel.less'

interface Props {
  type: number
  clickHandle: () => void
}

function FocusPanel(props: Props) {
  const { type, clickHandle } = props
  return (
    <>
      <InterceptPopup onClickHandle={clickHandle}>
        <p className="popupText">
          {type === 1 ? '为了您下一次更容易找到我们' : '为了保存您的订单信息'} <br />
          {type === 1 ? '强烈建议您关注我们的服务号' : '请先一键关注服务号'}
        </p>
      </InterceptPopup>
    </>
  )
}

FocusPanel.defaultProps = {} as Partial<Props>

export default FocusPanel
