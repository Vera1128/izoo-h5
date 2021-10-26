import * as Sentry from '@sentry/browser'

const SentryInit = () => {
  try {
    // 不上报
    if (APP_ENV !== 'prod' || !SENTRY_DSN) {
      return
    }
    Sentry.init({
      dsn: SENTRY_DSN,
      beforeSend: (event, hint: any) => {
        //  针对http请求错误添加返回参数sentry上报
        const hintOriginalException = hint.originalException
        const copyEvent = event
        if (hintOriginalException && hintOriginalException.response) {
          const res = hintOriginalException.response
          const resData = res.data
          const response = {
            ...resData,
            url: res.config.url,
          }
          copyEvent.extra = response
        }
        return copyEvent
      },
    })
  } catch (err) {
    throw new Error(err)
  }
}

const SentryRepost = (errMsg: any) => {
  try {
    // 不上报
    if (APP_ENV !== 'prod' || !SENTRY_DSN) {
      return
    }
    Sentry.captureException(errMsg)
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * 上报错误
 * @param title 上报错误类型
 * @param errMsg 错误信息
 * @param extraData 上报额外信息
 */
 export const sentryReportMessage = async (title: string, errMsg?: any, extraData: any = null) => {
  try {
    if (APP_ENV !== 'prod') return
    const reportTitle = `${title || '上报异常'}`
    Sentry.setExtra('extraCommon', { errMsg, extraData })
    Sentry.captureMessage(reportTitle)
  } catch (err) {
    window.console.log(err)
  }
}

export default { SentryInit, SentryRepost }
