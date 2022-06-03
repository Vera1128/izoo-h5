/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2021-11-01 15:33:37
 * @LastEditTime: 2022-03-21 21:46:24
 */
import React from 'react'
import EarphoneIcon from 'assets/images/earphone-icon.png'
import EmptyList from '../EmptyList'
import ListHeader from '../ListHeader'
import './index.less'

interface Props {
  className?: string
  list: Array<any>
  itemClick?: (item: any) => () => void
  clickMoreHandle?: () => void
}

function NearbyList(props: Props) {
  const { list, itemClick, clickMoreHandle } = props
  return (
    <div className={`nearbyListContainer ${props.className}`}>
      <ListHeader title="离你不远" clickHandle={clickMoreHandle} />
      <div className="nearbyList">
        {list.length > 0 ? (
          list.slice(0, 4).map(({ mainClassId, title, distance, scrollImage, desc }) => (
            <div className="nearbyItem" key={mainClassId} onClick={itemClick(mainClassId)}>
              <img src={scrollImage} className="scrollImage" />
              <div className="placeInfo">
                <div className="place">
                  <img src={EarphoneIcon} className="listenIcon" />
                  <p className="placeInfoTitle">{`${title.length > 6 ? title.substring(0, 6) : title}`}</p>
                </div>
                <div className="distance">{`${distance.toFixed(2)}km`}</div>
              </div>
              <div className="desc">{desc || '简介TODO'} </div>
            </div>
          ))
        ) : (
          <EmptyList classname="nearbyEmpty">附近还没有景点哦~</EmptyList>
        )}
      </div>
    </div>
  )
}

NearbyList.defaultProps = {
  className: '',
  itemClick: () => () => {},
  clickMoreHandle: () => {},
} as Partial<Props>

export default NearbyList
