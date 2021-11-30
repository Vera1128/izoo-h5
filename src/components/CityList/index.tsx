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
}

function CityList(props: Props) {
  const { className, list } = props
  const clickMoreHandle = () => {
    console.log('更多')
  }
  return (
    <div className={`cityListContainer ${className}`}>
      <ListHeader title="城市路线" clickHandle={clickMoreHandle} />
      <div className="cityList">
        {list.map((item) => (
          <img className="cityItem" src={item.poster} key={item.city} alt="城市图片" />
        ))}
      </div>
    </div>
  )
}

CityList.defaultProps = {
  className: '',
} as Partial<Props>

export default CityList
