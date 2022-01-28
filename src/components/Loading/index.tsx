import React from 'react'
import Lottie from 'lottie-react'
import './index.scss'
import loadingAnimation from 'assets/lotties/loading.json'

function Loading() {
  return (
    <div className="loading">
      <div className="loading-center">
        <Lottie className="animation-loading" animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  )
}

export default Loading
