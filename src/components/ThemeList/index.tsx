import React, { useState } from 'react'
import * as schemes from 'src/schemes'
import themeIcon from 'assets/images/theme-icon.png'
import ListHeader from '../ListHeader'
import './index.less'

interface Props {
  list: Array<schemes.ThemeListItem | null>
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
        {list.map((item) => (
          <div className="themeItem" key={item._id}>
            <img src={item.icon} alt="主题图片" />
            <p className="desc">{item.tag}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

ThemeList.defaultProps = {} as Partial<Props>

export default ThemeList
