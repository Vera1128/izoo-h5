/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2021-11-01 17:25:34
 * @LastEditTime: 2022-03-23 21:03:47
 */
import React, { useState } from 'react'
import * as schemes from 'src/schemes'
import themeIcon from 'assets/images/theme-icon.png'
import ListHeader from '../ListHeader'
import './index.less'

interface Props {
  list: Array<schemes.ThemeListItem | null>
  itemClick?: (tag: string) => () => void
}

function ThemeList(props: Props) {
  const { list, itemClick } = props
  const clickMoreHandle = () => {
    console.log('更多')
  }
  return (
    <div className="themeListContainer">
      <ListHeader title="行走主题" clickHandle={clickMoreHandle} hasBtn={false} className="listHeader" />
      <div className="themeList">
        {list.map(
          (item, index) =>
            item.tag && (
              <div className="themeItem" key={item._id} onClick={itemClick(item.tag)}>
                <img src={item.icon} alt="主题图片" />
                <p className="desc">{item.tag}</p>
              </div>
            ),
        )}
      </div>
    </div>
  )
}

ThemeList.defaultProps = {
  itemClick: () => () => {},
} as Partial<Props>

export default ThemeList
