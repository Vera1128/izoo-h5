/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2021-11-01 19:37:07
 * @LastEditTime: 2022-03-23 22:39:05
 */
import React, { useState } from 'react'
import SwiperTestImg from 'assets/images/swiper-test.png'
import ListHeader from '../ListHeader'
import './index.less'

interface ListItemProps {
  city: string
  poster: string
}
interface Props {
  className?: string
  list: Array<ListItemProps | null>
  itemClick?: (item: any) => () => void
  clickMoreHandle?: () => void
}

function CityList(props: Props) {
  const { className, list, clickMoreHandle, itemClick } = props
  return (
    <div className={`cityListContainer ${className}`}>
      <ListHeader title="城市路线" clickHandle={clickMoreHandle} />
      <div className="cityList">
        {list.map((item, index) => (
          <img className="cityItem" src={item.poster} key={item.city} alt="城市图片" onClick={itemClick(item.city)} />
        ))}
      </div>
    </div>
  )
}

CityList.defaultProps = {
  className: '',
  itemClick: () => () => {},
  clickMoreHandle: () => {},
} as Partial<Props>

export default CityList
