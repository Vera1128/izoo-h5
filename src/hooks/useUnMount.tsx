import { useEffect } from 'react'

// 模版注销
const useUnMount = (fn: () => void) => {
  useEffect(() => {
    return () => {
      fn()
    }
  }, [fn])
}

export default useUnMount
