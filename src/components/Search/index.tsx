import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import AllRouteItem from 'components/AllRouteItem'
import SearchIcon from 'assets/images/search-icon.png'
import SearchEmptyImg from 'assets/images/search-empty.png'
import './index.scss'

interface Props {
  rightButton?: React.ReactNode | string
  itemClick?: (string) => () => void
}

function Search({
  rightButton,
  history,
  hot,
  list,
  getSearchHistory,
  search,
  searchWord,
  setSearchWord,
  itemClick,
  inputFocus,
  showCancleText,
  showSearchRes,
  showRightButton,
  setInputFocus,
  setShowCancleText,
  setShowSearchRes,
  setShowRightButton,
}) {
  console.log('showRightButton', showRightButton)
  const [searchValue, setSearchValue] = useState(searchWord)

  const focusHandle = () => {
    getSearchHistory()
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
    setSearchValue('')
    if (rightButton) {
      setShowRightButton(true)
    }
  }
  const searchHandle = async () => {
    if (!searchValue) return
    setSearchWord(searchValue)
    await search(searchValue)
    setShowSearchRes(true)
  }
  const inputHandle = (e) => {
    const {
      target: { value },
    } = e
    setSearchValue(value.trim())
  }
  const clearSearchHandle = () => {
    console.log('清空历史搜索记录')
  }
  const clickTagToSearch = (tag) => async () => {
    setSearchValue(tag)
    await search(tag)
    setShowSearchRes(true)
  }
  return (
    <div className="search">
      <div className="topArea">
        <div className="searchContainer">
          <div className="inputContent">
            <img src={SearchIcon} className="searchIcon" alt="" onClick={searchHandle} />
            <input
              value={searchValue}
              placeholder="搜索导览/景点/线路"
              className="input"
              onFocus={focusHandle}
              onInput={inputHandle}
              type="search"
            />
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
            {history.length > 0 && (
              <>
                <div className="titleContainer">
                  <div className="mainTitle">我的搜索</div>
                  <div className="subTitle" onClick={clearSearchHandle}>
                    清空搜索记录
                  </div>
                </div>

                <div className="searchTagContainer">
                  {history.slice(0, 10).map((item) => (
                    <div className="tag" key={item} onClick={clickTagToSearch(item)}>
                      {item}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="mySearchContainer">
            <div className="titleContainer">
              <div className="mainTitle">热门搜索</div>
            </div>
            <div className="searchTagContainer">
              {hot.map((item) => (
                <div className="tag" key={item} onClick={clickTagToSearch(item)}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {showSearchRes && (
        <div className="searchResContainer">
          <div className="searchResTitleContainer">
            <div className="titleContainer">
              <div className="mainTitle">搜索结果</div>
              <div className="subTitle">共搜索到{list.length || 0}个结果</div>
            </div>
          </div>
          <div className="searchRes">
            {list.length > 0 ? (
              list.map((item) => (
                <AllRouteItem data={item} key={item.mainClassId} onClick={itemClick(item.mainClassId)} />
              ))
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
  itemClick: () => () => {},
} as Partial<Props>

const mapState = ({
  search: { history, hot, list, searchWord, inputFocus, showCancleText, showSearchRes, showRightButton },
}) => ({
  history,
  hot,
  list,
  searchWord,
  inputFocus,
  showCancleText,
  showSearchRes,
  showRightButton,
})

const mapDispatch = ({
  search: {
    getSearchHistory,
    search,
    setSearchWord,
    setInputFocus,
    setShowCancleText,
    setShowSearchRes,
    setShowRightButton,
  },
}) => ({
  getSearchHistory,
  search,
  setSearchWord,
  setInputFocus,
  setShowCancleText,
  setShowSearchRes,
  setShowRightButton,
})

export default connect(mapState, mapDispatch)(Search)
