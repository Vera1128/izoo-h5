import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'

import MenuBar from 'src/components/Menu'

import mainIcon from 'src/assets/images/main.png'
import mainSelectedIcon from 'src/assets/images/main-selected.png'
import tripIcon from 'src/assets/images/trip.png'
import tripSelectedIcon from 'src/assets/images/trip-selected.png'
import userIcon from 'src/assets/images/user.png'
import userSelectedIcon from 'src/assets/images/user-selected.png'

import './index.scss'

const menuConfig = [
  {
    id: 'mainPage',
    to: '/index/mainPage',
    title: '文化行走',
    icon: mainIcon,
    iconSelected: mainSelectedIcon,
  },
  {
    id: 'menu2',
    to: '/index/demo2',
    title: '全部路线',
    icon: tripIcon,
    iconSelected: tripSelectedIcon,
  },
  {
    id: 'menu3',
    to: '/index/demo3',
    title: '个人中心',
    icon: userIcon,
    iconSelected: userSelectedIcon,
  },
]

const Index: FC<any> = (props) => {
  const matchPathArr = menuConfig.filter((menuItem) => menuItem.to === props.location.pathname)
  const [selectedId, setSelectedId] = useState(matchPathArr[0]?.id || 'mainPage')
  const menuSwitchHandle = (menuItem) => () => {
    setSelectedId(menuItem.id)
  }
  return (
    <div className="wrap">
      <div className="content">{props.children}</div>
      <MenuBar>
        {menuConfig.map((menuItem) => (
          <Link
            to={menuItem.to}
            replace
            className={`menuItem ${menuItem.id === selectedId ? 'menuItemSelected' : ''}`}
            key={menuItem.id}
            onClick={menuSwitchHandle(menuItem)}
          >
            <img className="menuIcon" src={menuItem.id === selectedId ? menuItem.iconSelected : menuItem.icon} />
            <p>{menuItem.title}</p>
          </Link>
        ))}
      </MenuBar>
    </div>
  )
}

export default Index
