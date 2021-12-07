import React from 'react'
import Tag from '../Tag'
import './index.less'

interface Props {
  data: {
    scrollImage: string
    street: string
    tags: Array<string>
    title: string
    city: string
  }
}

function AllRouteItem(props: Props) {
  const {
    data: { scrollImage, street, tags, title, city },
  } = props
  return (
    <div className="allRouteItem">
      <img src={scrollImage} alt="" className="allRouteItemImg" />
      <div className="allRouteContent">
        <p className="desc">{street}</p>
        <div className="tagList">{tags.map((item) => item && <Tag key={item} text={item} className="tag" />)}</div>
        <p className="name">{title}</p>
      </div>
      <div className="location">{city}</div>
    </div>
  )
}

export default AllRouteItem
