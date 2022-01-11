import React from 'react'
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
          list.map(({ mainClassId, title, distance, scrollImage, desc }) => (
            <div className="nearbyItem" key={mainClassId} onClick={itemClick(mainClassId)}>
              <img src={scrollImage} />
              <div className="placeInfo">
                <div className="place">
                  <span>{title}</span>
                </div>
                <span className="distance">{`${distance.toFixed(2)}km`}</span>
              </div>
              <div className="desc">{desc || '简介TODO'} </div>
            </div>
          ))
        ) : (
          <EmptyList text="附近还没有景点哦~" classname="nearbyEmpty" />
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
