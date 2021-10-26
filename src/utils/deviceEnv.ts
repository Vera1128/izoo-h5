// 判断当前设备环境
interface IEnv {
  IN_IOS: boolean // 判断是否在ios环境
  IN_MAC: boolean // 判断是否在mac环境
  IN_ANDROID: boolean // 判断是否在安卓环境
  IN_MAC_SAFARI: boolean // 判断是否在mac的safari浏览器
  IN_WEBKIT: boolean // 判断是否webkit内核
  IN_PC_IE: boolean // 是否在ie环境
  IN_WINDOWS_PHONE: boolean // 判断是否在windows phone环境
  IN_WEIXIN: boolean // 是否在微信环境
  IN_COMPATIBLE_IE: boolean // 判断是否在老版本浏览器 老版本360|360|遨游|猎豹|qq浏览器|2345|世界之窗
  IN_WEIBO: boolean // 判断是否微博环境
  IN_MAIN_APP: boolean // 判断是否在主app
  DEVICE_VERSION: Array<string> // 系统版本号
}

const ua: string = navigator?.userAgent?.toLocaleLowerCase?.()
const inIOS = /(ipad|iphone|ipod)/i.test(ua)
const inAndroid = /android/i.test(ua)
const inMac = /mac/i.test(ua)
const inWeiXin = ua.match(/micromessenger/i)?.includes?.('micromessenger')
const inWeibo = /weibo/i.test(ua)
const inMainApp = /iting/.test(ua)
const inWebkit = /webkit/i.test(ua)
const inWindowsPhone = /windows phone/i.test(ua)
const inPcIE = !!window.ActiveXObject || 'ActiveXObject' in window
const inCompatibleIE = inPcIE && /360|compatible|maxthon|lbbrowser|qqbrowser|2345|theworld/i.test(ua)
const inMacSafari = inMac && /safari/i.test(ua) && !/chrome/i.test(ua)

// 系统版本号
let deviceVersion: string[]
let version: RegExpExecArray
if (inIOS) {
  version = /IPhone OS (\d+)\_(\d+)\_(\d+)/gi.exec(ua) || /IPhone OS (\d+)\_(\d+)/gi.exec(ua)
} else if (inAndroid) {
  version = /Android[\.\/\s](\d+)\.(\d+)\.(\d+)/gi.exec(ua) || /Android[\.\/\s](\d+)\.(\d+)/gi.exec(ua)
}
if (version) {
  deviceVersion = version.slice(1)
}

// 暴露出环境
const deviceEnv: IEnv = {
  IN_IOS: inIOS,
  IN_MAC: inMac,
  IN_ANDROID: inAndroid,
  IN_MAC_SAFARI: inMacSafari,
  IN_WEBKIT: inWebkit,
  IN_PC_IE: inPcIE,
  IN_WINDOWS_PHONE: inWindowsPhone,
  IN_WEIXIN: inWeiXin,
  IN_COMPATIBLE_IE: inCompatibleIE,
  IN_WEIBO: inWeibo,
  IN_MAIN_APP: inMainApp,
  DEVICE_VERSION: deviceVersion,
}

export default deviceEnv
