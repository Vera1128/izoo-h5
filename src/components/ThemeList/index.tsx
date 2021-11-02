import React, { useState } from 'react'
import themeIcon from 'assets/images/theme-icon.png'
import ListHeader from '../ListHeader'
import './index.less'

interface Props {
  list: Array<any>
}

function ThemeList(props: Props) {
  const { list } = props
  const clickMoreHandle = () => {
    console.log('更多')
  }
  return (
    <div className="themeListContainer">
      <ListHeader title="行走主题" clickHandle={clickMoreHandle} hasBtn={false} className="listHeader" />
      <div className="themeList">
        <div className="themeItem">
          <img src={themeIcon} />
          <p className="desc">历史哲思</p>
        </div>
        <div className="themeItem">
          <img src={themeIcon} />
          <p className="desc">历史哲思</p>
        </div>
        <div className="themeItem">
          <img src={themeIcon} />
          <p className="desc">历史哲思</p>
        </div>
        <div className="themeItem">
          <img src={themeIcon} />
          <p className="desc">历史哲思</p>
        </div>
      </div>
    </div>
  )
}

ThemeList.defaultProps = {} as Partial<Props>

export default ThemeList
