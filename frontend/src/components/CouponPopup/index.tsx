import React from 'react'
import CouponImg from 'assets/images/coupon-bg.png'
import './index.scss'

const CouponPopup = ({ onClose, onLeftClickHandle, onRightClickHandle }) => (
  <div className="couponPopupContainer" onClick={onClose}>
    <div className="coupon">
      <div className="couponTitle">
        您可以使用一张通行券
        <br />
        免费购买
      </div>
      <img src={CouponImg} className="couponImg" alt="" />
      <div className="couponBtnContainer">
        <div className="couponBtn" onClick={onLeftClickHandle}>
          使用兑换券
        </div>
        <div className="couponBtn couponBtnRight" onClick={onRightClickHandle}>
          任性付费买
        </div>
      </div>
    </div>
  </div>
)
export default CouponPopup
