import React, { useEffect, useState } from 'react'
import { useSpring, animated, interpolate } from 'react-spring'
import { useGesture } from 'react-use-gesture'

const Slide = ({ className, children, index, reset, onMyDragStar, onEnd, offsetWidth, criticalWidth }) => {
  const [{ x }, set] = useSpring(() => ({
    x: 0,
  }))

  useEffect(() => {
    if (reset) set({ x: 0 })
  }, [reset])

  const bind = useGesture({
    onDragStart: () => {
      onMyDragStar(index)
    },
    onDrag: ({ delta, down, last }) => {
      const x = down ? delta[0] : 0
      if (delta[0] >= 0) set({ x: 0 })
      if (delta[0] < 0) {
        set({ x })
        if (last && delta[0] && Math.abs(delta[0]) > criticalWidth) {
          set({ x: -offsetWidth })
          onEnd()
        }
      }
    },
  })

  return (
    <animated.div
      {...bind()}
      style={{
        transform: interpolate([x], (x) => `translate3d(${x}px,0,0)`),
      }}
      className={className}
    >
      {children}
    </animated.div>
  )
}

export default Slide
