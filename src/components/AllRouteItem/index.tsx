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
  onClick?: () => void
}

function AllRouteItem(props: Props) {
  const {
    data: { scrollImage, street, tags, title, city },
    onClick,
  } = props
  return (
    <div className="allRouteItem" onClick={onClick}>
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

AllRouteItem.defaultProps = {
  onClick: () => {},
} as Partial<Props>

export default AllRouteItem
