/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable promise/no-return-wrap */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import axios from 'axios'

import { optionSort, getQueryParam } from 'utils/index'
import Toast from 'components/Toast'
import sentry from './sentry'

// 后端异常状态
const ErrorCode: any = {
  200: '操作成功', // 服务器成功返回请求的数据。
  201: '更新成功', // 新建或修改数据成功。
  202: '等待执行', // 一个请求已经进入后台排队（异步任务）。
  204: '操作成功', // 删除数据成功。
  400: '操作失败，请稍后重试', // 发出的请求有错误，服务器没有进行新建或修改数据的操作。
  401: '授权失败，请重新登陆', // 用户没有权限（令牌、用户名、密码错误）。
  403: '您还没有访问权限哦', // 用户得到授权，但是访问是被禁止的。
  404: '操作异常', // 发出的请求针对的是不存在的记录，服务器没有进行操作。
  406: '服务请求出错', // 请求的格式不可得。
  410: '资源失效，请刷新重试', // 请求的资源被永久删除，且不会再得到的。
  422: '验证失败，请稍后重试', // 当创建一个对象时，发生一个验证错误。
  500: '服务器开小差了', // 服务器发生错误，请检查服务器。
  502: '网关开小差了', // 网关错误。
  503: '服务器太忙了，请稍后重试', // 服务不可用，服务器暂时过载或维护。
  504: '网关太忙了，请稍后重试', // 网关超时。
}

// 额外的默认参数
const defaultParams = {
  toast: false, // 请求中的状态
  sort: true, // 过滤空值参数
  origin: false, // 是否返回所有响应信息（包括响应头）
  intact: false, // 返回后端的响应数据
  sucessPrompt: false, // 成功提示
  errorPrompt: true, // 失败提示
  accredit: false, // 是否授权
  errorPromptMessage: '', // 接口请求失败提示
  baseUrl: '', // 请求基础路径
  frontPath: '', // 服务路径
  apiVersion: '', // 接口版本号
  headers: {}, // headers
  ipv: false,
}

// 默认的请求配置信息
const defaultRequestConfig: any = {
  timeout: 5000,
  withcredials: true,
  cancelToken: '',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
}

// 允许跨域请求
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

// 错误提示
const handleErrorTips = (status: number, msg?: string) => {
  const str = ErrorCode.hasOwnProperty(status) ? ErrorCode[status] : `状态异常,状态码: ${status}`
  // 上报错误信息
  Toast(msg || str, 2000)
}

// 请求拦截器
axios.interceptors.request.use(
  (config) => config,
  (err) => {
    // 拦截器出错
    Toast('请求出错了', 2000)
    // 生产环境上报错误信息
    console.log('err: ', err)
    return null
  },
)

// 响应拦截器
axios.interceptors.response.use(
  (res) => Promise.resolve(res),
  (err) => {
    sentry.SentryRepost(err)
    const status = err.response ? err.response.status : -100
    if (/Network Error/.test(err)) {
      Toast('网络已断开，请检查您的网络后，刷新重试')
    } else if (/code 401/.test(err)) {
      Toast('未登录授权，或登录过期', 1000)
      // 针对401请求特殊处理，加上f params,防止一直重复请求
      // 跳转到登陆页去登陆授权
      if (getQueryParam('f') !== 'request') {
        //
      }
    } else if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
      // 上报一下错误
      Toast('网络状态不佳，请检查您的网络后，刷新重新')
    } else {
      handleErrorTips(status)
    }
    // 权限不足，返回登录页
    return Promise.reject(err)
  },
)

// 请求封装
// 错误信息不反悔，直接给出错误提示
const Request =
  (method = 'get') =>
  (
    url: string, // 请求路径
    data = {}, // 请求参数
    params = {}, // 额外的请求参数
  ) => {
    let uri = ''
    // 额外配置参数
    const newParams = { ...defaultParams, ...params }
    const newData = data && newParams?.sort ? optionSort(data) : data
    if (newParams?.toast) {
      Toast('请求中...')
    }
    // axios get请求是包装在params中的
    const opts = method?.toLocaleLowerCase() === 'get' ? { params: newData } : newData
    // const requestType: any = axios[method || 'get']
    // 请求参数
    const requestConfig = { ...defaultRequestConfig }
    // 判断是否有baseUrl
    if (newParams?.baseUrl) {
      uri += newParams.baseUrl
      requestConfig.baseURL = newParams.baseUrl
    }
    // post请求参数放在params中
    if (newParams?.ipv) {
      requestConfig.params = opts
    }
    // 添加前端请求前缀
    if (newParams?.frontPath) {
      uri += newParams.frontPath
    }
    // 接口版本号
    if (newParams?.apiVersion) {
      uri += `/${newParams.apiVersion}`
    }
    // 链接地址
    uri += url
    // 请求地址
    if (newParams?.headers) {
      requestConfig.headers = newParams.headers
    }
    return axios[method](uri, opts, requestConfig).then((res: any) => {
      const dat = res.data
      const { code } = dat
      if (newParams.accredit || code === 0) {
        // 提示成功信息
        if (newParams.sucessPrompt) {
          // 是否是自定义的响应信息
          const isTips = typeof newParams.sucessPrompt === 'string'
          Toast(isTips ? newParams.sucessPrompt : res.message || '操作成功', 1000)
        }
        return newParams.origin ? res : newParams.intact ? dat : dat.data
      }
      // 接口响应状态出错，上报异常
      // 错误提醒
      if (newParams.errorPrompt) {
        const isTips = typeof newParams.errorPrompt === 'string'
        isTips && Toast(newParams?.errorPromptMessage ?? dat?.message)
      }
      sentry.SentryRepost(res)
      // 状态错误，不处理
      return Promise.reject(dat)
    })
  }

export const get = Request('get')
export const post = Request('post')
export const put = Request('put')
export const patch = Request('patch')

export default Request
