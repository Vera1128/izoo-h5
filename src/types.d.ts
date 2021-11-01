declare module '*.css'
declare module '*.scss'
declare module '*.less'
declare module '*.png'
declare module '*.svg'
declare module '*.jpg'
declare module '*.gif'

declare module '*.json'

declare module 'swiper/react'

declare const APP_ENV: string
declare const APP_NAME: string
declare const APP_BASENAME: string
declare const SENTRY_DSN: string

declare namespace JSX {
  interface IntrinsicElements {
    'wx-open-launch-weapp': any
  }
}

interface Window {
  [key: string]: any
}

interface Document {
  [key: string]: any
}
