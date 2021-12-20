import React, { FC } from 'react'
import ShareArrowIcon from 'assets/images/share-arrow-icon.png'
import './index.scss'

const Mask = ({ children, onClickHandle }) => (
  <div className="maskComponent" onClick={onClickHandle}>
    <img src={ShareArrowIcon} className="shareArrowIcon" />
    {children}
  </div>
)

Mask.defaultProps = {}

export default Mask
