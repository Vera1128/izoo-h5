import React from 'react'
import statUtil from 'src/utils/statUtil'
import './index.less'

interface Props {
  className?: string
  clickHandle?: () => void
  title: string
  btnText?: string
  hasBtn?: boolean
}

function listHeader(props: Props) {
  const { className, clickHandle, title, btnText, hasBtn } = props
  return (
    <div className={`listHeader ${className}`}>
      <div className="left-title">{title}</div>
      {hasBtn && (
        <div className="right-btn" onClick={() => {
          clickHandle()
        }}>
          {btnText}
        </div>
      )}
    </div>
  )
}

listHeader.defaultProps = {
  className: '',
  clickHandle: () => {},
  btnText: '更多 >',
  hasBtn: true,
} as Partial<Props>

export default listHeader
