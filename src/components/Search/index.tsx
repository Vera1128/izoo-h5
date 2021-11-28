import React, { useState } from 'react'
import AllRouteItem from 'components/AllRouteItem'
import SearchIcon from 'assets/images/search-icon.png'
import SearchEmptyImg from 'assets/images/search-empty.png'
import './index.scss'

interface Props {
  rightButton?: React.ReactNode | string
}

const list = [
  //   {
  //     id: new Date().getTime(),
  //     imgSrc: SwiperTestImg,
  //     desc: '聚焦中国经济发展聚焦中国经济发展聚焦中国经济发展',
  //     tagList: ['科学发展', '文学艺术'],
  //     name: '沪港银行历史展览馆',
  //     location: '上海',
  //   },
]

function Search(props: Props) {
  const { rightButton } = props
  const [inputFocus, setInputFocus] = useState(false)
  const [showCancleText, setShowCancleText] = useState(false)
  const [showSearchRes, setShowSearchRes] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)
  const focusHandle = () => {
    console.log('focus')
    setInputFocus(true)
    setShowSearchRes(false)
    setShowRightButton(false)
    if (rightButton) {
      setShowCancleText(true)
    } else {
      setTimeout(() => {
        setShowCancleText(true)
      }, 200)
    }
  }
  const cancelButtonClick = () => {
    setInputFocus(false)
    setShowCancleText(false)
    setShowSearchRes(false)
    if (rightButton) {
      setShowRightButton(true)
    }
  }
  const searchHandle = () => {
    setShowSearchRes(true)
  }
  return (
    <div className="search">
      <div className="topArea">
        <div className="searchContainer">
          <div className="inputContent">
            <img src={SearchIcon} className="searchIcon" alt="" onClick={searchHandle} />
            <input placeholder="搜索导览/景点/线路" className="input" onFocus={focusHandle} />
          </div>
        </div>
        {rightButton ? (
          <>
            {showRightButton ? (
              rightButton
            ) : (
              <div className="cancelButton" onClick={cancelButtonClick}>
                {showCancleText && <p>取消</p>}
              </div>
            )}
          </>
        ) : (
          <>
            <div className={`cancelButtonTran ${inputFocus ? 'cancelButtonLarge' : ''}`} onClick={cancelButtonClick}>
              {showCancleText && <p>取消</p>}
            </div>
          </>
        )}
      </div>
      {inputFocus && (
        <div className="searchPanel">
          <div className="mySearchContainer">
            <div className="titleContainer">
              <div className="mainTitle">我的搜索</div>
              <div className="subTitle">清空搜索记录</div>
            </div>
            <div className="searchTagContainer">
              <div className="tag">静安公园</div>
              <div className="tag">公园</div>
            </div>
          </div>
          <div className="mySearchContainer">
            <div className="titleContainer">
              <div className="mainTitle">热门搜索</div>
            </div>
            <div className="searchTagContainer">
              <div className="tag">静安公园</div>
              <div className="tag">公园</div>
              <div className="tag">武康路</div>
              <div className="tag">徐家汇</div>
              <div className="tag">银行展览馆</div>
              <div className="tag">园</div>
              <div className="tag">公园</div>
              <div className="tag">静公园</div>
              <div className="tag">静安公园</div>
            </div>
          </div>
        </div>
      )}
      {showSearchRes && (
        <div className="searchResContainer">
          <div className="searchResTitleContainer">
            <div className="titleContainer">
              <div className="mainTitle">搜索结果</div>
              <div className="subTitle">共搜索到2个结果</div>
            </div>
          </div>
          <div className="searchRes">
            {list.length > 0 ? (
              list.map((item) => <AllRouteItem data={item} key={item.id} />)
            ) : (
              <div className="searchEmpty">
                <img src={SearchEmptyImg} alt="" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

Search.defaultProps = {
  rightButton: '',
} as Partial<Props>

export default Search
