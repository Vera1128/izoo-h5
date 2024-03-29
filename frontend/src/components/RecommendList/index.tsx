import React from 'react'
import * as scheme from 'src/schemes'
import ListHeader from '../ListHeader'
import Tag from '../Tag'
import './index.less'

interface Props {
  className?: string
  list: Array<scheme.RecommendItem | null>
  itemClick?: (item: any) => () => void
}

function RecommendList(props: Props) {
  const { list, itemClick } = props
  return (
    <div className={`recommendListContainer ${props.className}`}>
      <ListHeader title="热门推荐" hasBtn={false} className="listHeader" />
      <div className="recommendList">
        {list.map((item) => (
          <div className="recommendItem" key={item.mainClassId}>
            <div className="recommendItemContent">
              <img src={item.scrollImage} />
              <div className="contentContainer">
                <p className="name">{item.title}</p>
                <p className="desc">{item.desc || '简介TODO'}</p>

                <div className="tagList">
                  {item.tags.map((tag) => (
                    <Tag className="tag" key={tag} text={tag} />
                  ))}
                </div>

                <p className="num">
                  时长{Math.round(item.duration / 60)}分钟&nbsp;&nbsp;&nbsp;&nbsp;讲解{item.totals}条
                </p>
              </div>
              <div className="listenBtn" onClick={itemClick(item.mainClassId)}>
                进入收听
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

RecommendList.defaultProps = {
  className: '',
  itemClick: () => () => {},
} as Partial<Props>

export default RecommendList
