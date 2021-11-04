import React from 'react'
import Tag from '../Tag'
import './index.less'

interface Props {
  data: {
    imgSrc: string
    desc: string
    tagList: Array<string>
    name: string
    location: string
  }
}

function AllRouteItem(props: Props) {
  const {
    data: { imgSrc, desc, tagList, name, location },
  } = props
  return (
    <div className="allRouteItem">
      <img src={imgSrc} alt="" className="allRouteItemImg" />
      <div className="allRouteContent">
        <p className="desc">{desc}</p>
        <div className="tagList">
          {tagList.map((item) => (
            <Tag key={item} text={item} className="tag" />
          ))}
        </div>
        <p className="name">{name}</p>
      </div>
      <div className="location">{location}</div>
    </div>
  )
}

export default AllRouteItem
