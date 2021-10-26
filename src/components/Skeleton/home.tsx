import React from 'react'

const HomeSkeleton = () => (
  <div className="skel__containter page__wrap">
    <div className="page__banner">
      <div className="page__img skel__animate skel__animate_delay">
        <div className="placeholde__img" />
      </div>
    </div>
    <div className="page__pannel">
      <div className="page__pannel_content">
        <div className="page__pannel_item skel__text skel__animate" />
        <div className="page__pannel_item skel__text skel__animate" />
        <div className="page__pannel_item skel__text skel__animate" />
      </div>
    </div>
    <div className="page__content skel__animate skel__animate_delay">
      <div className="placeholde__img" />
    </div>
    <div className="page__bottom">
      <div className="page__bottom_item">
        <div className="page__bottom_label skel__animate" />
      </div>
      <div className="page__bottom_item">
        <div className="page__bottom_bottom skel__animate" />
      </div>
    </div>
  </div>
)

export default HomeSkeleton
