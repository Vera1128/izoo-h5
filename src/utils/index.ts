// 传参空值过滤
export function optionSort(opt: any) {
  let obj: any = {}
  if (typeof opt === 'object') {
    for (const k in opt) {
      if (opt[k] !== null && opt[k] !== '') {
        obj[k] = opt[k]
      }
    }
  } else {
    obj = opt
  }
  return obj
}

// 拓展对象
export function extend<T>(a: T, b: T): T {
  let k: string
  if (typeof b !== 'object') {
    return a
  }
  for (k in b) {
    if (b.hasOwnProperty(k)) {
      if (b[k] !== undefined) {
        a[k] = b[k]
      }
    }
  }
  return a
}

// 获取查询参数
export function getQueryParam(k, query?: string, seperator = '&') {
  const param = {}
  const queryStr = query || window.location.search.substring(1)
  const arr = queryStr.split(seperator || '&')

  for (const i in arr) {
    const tem = arr[i].match(/^\s*([%\w]+)=(.*)[#]?$/)
    try {
      param[tem[1]] = decodeURIComponent(tem[2])
    } catch (e) {
      console.log(JSON.stringify(e))
    }
  }
  return k ? param[k] : param
}

// 判断是否数组
export function isArray(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

// 对象序列化
export function paramStr(obj, shallow?: boolean) {
  let result = ''
  if (typeof obj === 'string') {
    return obj
  }
  if (typeof obj === 'object' && !isArray(obj)) {
    for (const key in obj) {
      const val = obj[key]
      if (isArray(val)) {
        let suffix = ''
        if (!shallow) {
          suffix = '[]'
        }
        for (let i = 0, len = val.length; i < len; i += 1) {
          result += `&${key}${suffix}=${val[i]}`
        }
      } else if (typeof val === 'function') {
        //
      } else {
        result += `&${key}=${val}`
      }
    }
  }
  return result.substring(1)
}

// 给指定url添加额外参数
export function addExtralParam(obj, uri) {
  const url = uri || window.location.href
  const p = /\?(.[^#]*)/
  let queryStr = ''
  let param = {}

  if (url.match(p)) {
    queryStr = url.match(p)
    param = extend(getQueryParam(null, queryStr[1]), obj)
    return url.replace(queryStr[1], paramStr(param))
  }
  // 无参数 无#
  queryStr = paramStr(obj)
  if (url.indexOf('#') > -1) {
    return url.replace(/(#.*)$/, `?${queryStr}$1`)
  }
  if (queryStr !== '') {
    return `${url}?${queryStr}`
  }
  return url
}

// 对象转params
export function paramObject(obj, split = '&') {
  if (Object.prototype.toString.call(obj) !== '[object Object]') return ''
  let str = ''
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      str += `${(str.length === 0 ? '?' : split) + key}=${encodeURIComponent(obj[key])}`
    }
  }
  return str
}

// 延迟
export function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

// 调用方法
export const safeInvoke = (fn: Function): void => {
  typeof fn === 'function' && fn()
}

// 添加脚本
export const appendScript = function (url: string) {
  const script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', url)
  document.body.appendChild(script)
  return new Promise((resolve) => {
    script.onload = resolve
  })
}

// 获取cookie
export function getCookie(name) {
  let arr
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  if ((arr = document.cookie.match(reg))) return unescape(arr[2])
  return null
}

/**
 * @description 处理频繁点击拦截
 * @param {Function} fn 一个 Promise 函数
 */
export const frequentlyClick = (fn: Function) => {
  let clickCount = false
  return async (...arg: any) => {
    try {
      if (clickCount) {
        return
      }
      clickCount = true
      if (typeof fn !== 'function') {
        throw new Error('fn not function')
      }
      return await fn(...arg)
    } finally {
      clickCount = false
    }
  }
}

// 防抖 立即执行
export const debounce = function debounce(fn, delay = 500) {
  let timer = null
  return function () {
    let args = arguments
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

/**
 *
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  执行间隔，单位是毫秒（ms）
 *
 * @return {Function}     返回一个“节流”函数
 */
export const throttle = (fn, threshold = 250) => {
  // 记录上次执行的时间
  let last
  // 定时器
  let timer
  // 返回的函数，每过 threshold 毫秒就执行一次 fn 函数
  return function (...args) {
    // 保存函数调用时的上下文和参数，传递给 fn
    const context = this
    const now = +new Date()
    // 如果距离上次执行 fn 函数的时间小于 threshold，那么就放弃
    // 执行 fn，并重新计时
    if (last && now < last + threshold) {
      clearTimeout(timer)
      // 保证在当前时间区间结束后，再执行一次 fn
      timer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, threshold)
      // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}
