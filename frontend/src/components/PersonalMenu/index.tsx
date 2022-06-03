import React from 'react'

import MenuHeartImg from 'assets/images/menuIcon/heart.png'
import MenuHistoryImg from 'assets/images/menuIcon/history.png'
import MenuOrderImg from 'assets/images/menuIcon/order.png'
import MenuServeImg from 'assets/images/menuIcon/serve.png'

import './index.less'

const menuList = [
  {
    id: 1,
    icon: MenuOrderImg,
    menuTitle: '全部订单',
    bgColor: '#B8E3E3',
  },
  {
    id: 2,
    icon: MenuHeartImg,
    menuTitle: '我的收藏',
    bgColor: '#B0D1E9',
  },
  {
    id: 3,
    icon: MenuHistoryImg,
    menuTitle: '收听历史',
    bgColor: '#9B88C7',
  },
  {
    id: 4,
    icon: MenuServeImg,
    menuTitle: '联系我们',
    bgColor: '#666699',
  },
]
interface Props {
  menuIndex: number
  clickMenuHandle: (number) => () => void
}

const PersonalMenu = (props: Props) => {
  const { menuIndex, clickMenuHandle } = props
  return (
    <div className="menuContainer">
      {menuList.map((menuItem, index) => (
        <div
          key={menuItem.id}
          className={`menuNormal ${menuIndex === index ? 'menuNormalActive' : ''}`}
          style={{ backgroundColor: menuItem.bgColor }}
          onClick={clickMenuHandle(index)}
        >
          <img src={menuList[index].icon} className={`menuIcon menuIcon${index}`} />
          <span className="menuTitle">{menuItem.menuTitle}</span>
        </div>
      ))}
    </div>
  )
}

export default PersonalMenu
