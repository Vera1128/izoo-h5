/* eslint-disable no-restricted-syntax */
import apiClient from "src/apis/apiClient"

/**
 * 日志通用记录埋点信息
 */
export interface IStat {
  /** 埋点行为 */
  action: string
  /** 详情数据 */
  data: {
    /** 通用信息 */
    common: {
      /** 操作系统 例如： windows,macos,ios,android */
      os: string
      /** 设备  例如： Chrome（版本: 102.0.5005.63&nbsp;&nbsp;内核: Blink） */
      device: string
      /** 屏幕尺寸 例如：1200*1800  */
      screenSize: string
      /** 客户端时间 例如： 2022/5/4 16:16:2  */
      clientTime: string
      /** 通用唯一标识id 例如: bdc4ace2-e918-422c-8594-01dff3d92b87 */
      uuid: string
    }
    /** 自定义数据 */
    [key: string]: any
  }

}

/**
 * 埋点类
 */
export default class statUtil {


  // eslint-disable-next-line no-restricted-globals
  private static root = typeof self !== 'undefined' ? self : this

  private static _window = this.root || {}

  private static VariableLibrary = {
    navigator: typeof this.root.navigator !== 'undefined' ? this.root.navigator : {},
    // 信息map
    infoMap: {
      engine: ['WebKit', 'Trident', 'Gecko', 'Presto'],
      // eslint-disable-next-line no-sparse-arrays
      browser: ['Safari', 'Chrome', 'Edge', 'IE', 'Firefox', 'Firefox Focus', 'Chromium', 'Opera', 'Vivaldi', 'Yandex', 'Arora', 'Lunascape', 'QupZilla', 'Coc Coc', 'Kindle', 'Iceweasel', 'Konqueror', 'Iceape', 'SeaMonkey', 'Epiphany', '360', '360SE', '360EE', 'UC', 'QQBrowser', 'QQ', 'Baidu', 'Maxthon', 'Sogou', 'LBBROWSER', '2345Explorer', 'TheWorld', 'XiaoMi', 'Quark', 'Qiyu', 'Wechat', , 'WechatWork', 'Taobao', 'Alipay', 'Weibo', 'Douban', 'Suning', 'iQiYi'],
      os: ['Windows', 'Linux', 'Mac OS', 'Android', 'Ubuntu', 'FreeBSD', 'Debian', 'iOS', 'Windows Phone', 'BlackBerry', 'MeeGo', 'Symbian', 'Chrome OS', 'WebOS'],
      device: ['Mobile', 'Tablet', 'iPad']
    }
  }

  private static device: string

  private static os: any

  private static browserVersion: string

  private static browser: any

  private static version: any

  private static engine: string

  /**
   * 埋点数据统计
   * @params action {string} 行为名称
   * @params data {object} 自定义数据
   */
  static async report(action: string, data?: {/** 自定义数据 */[key: string]: any }) {

    /** 统计数据 */
    const stat: IStat = {
      action: action,
      data: {
        ...data,
        common: {
          os: this.getOS(),
          device: this.getBrowserInfo(),
          clientTime: this.getClientTime(),
          // eslint-disable-next-line no-underscore-dangle
          screenSize: `${this._window.screen.width}*${this._window.screen.height}`,
          uuid: this.createUUID()
        }
      }
    }

    /** 是否今日首次上传 */
    let isFirstDay = true
    /** 客户端缓存记录key */
    const statKey = `walkidz-${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`
    /** 缓存数据解析获取 */
    const playerData = JSON.parse(localStorage.getItem(statKey)) as string[] || undefined

    /** 如果缓存数据不存在，重新记录 */
    if (!playerData) {
      localStorage.setItem(statKey, JSON.stringify([action]))
    } else {
      if (playerData.indexOf(action) >= 0) {
        isFirstDay = false
      } else {
        playerData.push(action)
        localStorage.setItem(statKey, JSON.stringify(playerData))
      }
    }
    await apiClient.callApi('Stat/ReportStat', {
      action: stat.action,
      isFirstDay: isFirstDay,
      data: stat.data
    }).then(res => {
      if (res.isSucc) {
        console.log(`-----------埋点上报:${action}-----------`, data)
      }
    })

  }

  /**
   * 获取设备类型
   */
  private static getDeviceType() {
    // eslint-disable-next-line no-underscore-dangle
    const _this = this
    _this.device = 'PC'
    this.matchInfoMap(_this)
    return _this.device
  }

  /**
   *  浏览器信息
   */
  private static getBrowserInfo() {
    // eslint-disable-next-line no-underscore-dangle
    const _this = this
    this.matchInfoMap(_this)

    const u = this.VariableLibrary.navigator.userAgent || {}
    const { mimeTypes } = this.VariableLibrary.navigator

    // eslint-disable-next-line no-underscore-dangle
    const _mime = function (option: string, value: string) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in mimeTypes) {
        if (mimeTypes[key][option] === value) {
          return true
        }
      }
      return false
    }

    const match = this.getMatchMap(u)

    let is360 = false
    // eslint-disable-next-line no-underscore-dangle
    if (this._window.chrome) {
      const chrome_version = u.replace(/^.*Chrome\/([\d]+).*$/, '$1')
      // eslint-disable-next-line no-underscore-dangle
      if (chrome_version > 36 && this._window.showModalDialog) {
        is360 = true
      } else if (chrome_version > 45) {
        is360 = _mime("type", "application/vnd.chromium.remoting-viewer")
      }
    }
    if (match.Baidu && match.Opera) {
      match.Baidu = false
    }
    if (match.Mobile) {
      match.Mobile = u.indexOf('iPad') <= -1
    }
    if (is360) {
      if (_mime("type", "application/gameplugin")) {
        match['360SE'] = true
      } else if (this.VariableLibrary.navigator && typeof this.VariableLibrary.navigator.connection.saveData === 'undefined') {
        match['360SE'] = true
      } else {
        match['360EE'] = true
      }
    }
    if (match.IE || match.Edge) {
      const navigator_top = window.screenTop - window.screenY
      switch (navigator_top) {
        case 71: // 无收藏栏,贴边
          break
        case 74: // 无收藏栏,非贴边
          break
        case 99: // 有收藏栏,贴边
          break
        case 102: // 有收藏栏,非贴边
          match['360EE'] = true
          break
        case 75: // 无收藏栏,贴边
          break
        case 105: // 有收藏栏,贴边
          break
        case 104: // 有收藏栏,非贴边
          match['360SE'] = true
          break
        default:
          break
      }
    }

    const browerVersionMap = {
      'Safari': function () {
        return u.replace(/^.*Version\/([\d.]+).*$/, '$1')
      },
      'Chrome': function () {
        return u.replace(/^.*Chrome\/([\d.]+).*$/, '$1').replace(/^.*CriOS\/([\d.]+).*$/, '$1')
      },
      'IE': function () {
        return u.replace(/^.*MSIE ([\d.]+).*$/, '$1').replace(/^.*rv:([\d.]+).*$/, '$1')
      },
      'Edge': function () {
        return u.replace(/^.*Edge\/([\d.]+).*$/, '$1')
      },
      'Firefox': function () {
        return u.replace(/^.*Firefox\/([\d.]+).*$/, '$1').replace(/^.*FxiOS\/([\d.]+).*$/, '$1')
      },
      'Firefox Focus': function () {
        return u.replace(/^.*Focus\/([\d.]+).*$/, '$1')
      },
      'Chromium': function () {
        return u.replace(/^.*Chromium\/([\d.]+).*$/, '$1')
      },
      'Opera': function () {
        return u.replace(/^.*Opera\/([\d.]+).*$/, '$1').replace(/^.*OPR\/([\d.]+).*$/, '$1')
      },
      'Vivaldi': function () {
        return u.replace(/^.*Vivaldi\/([\d.]+).*$/, '$1')
      },
      'Yandex': function () {
        return u.replace(/^.*YaBrowser\/([\d.]+).*$/, '$1')
      },
      'Arora': function () {
        return u.replace(/^.*Arora\/([\d.]+).*$/, '$1')
      },
      'Lunascape': function () {
        return u.replace(/^.*Lunascape[\/\s]([\d.]+).*$/, '$1')
      },
      'QupZilla': function () {
        return u.replace(/^.*QupZilla[\/\s]([\d.]+).*$/, '$1')
      },
      'Coc Coc': function () {
        return u.replace(/^.*coc_coc_browser\/([\d.]+).*$/, '$1')
      },
      'Kindle': function () {
        return u.replace(/^.*Version\/([\d.]+).*$/, '$1')
      },
      'Iceweasel': function () {
        return u.replace(/^.*Iceweasel\/([\d.]+).*$/, '$1')
      },
      'Konqueror': function () {
        return u.replace(/^.*Konqueror\/([\d.]+).*$/, '$1')
      },
      'Iceape': function () {
        return u.replace(/^.*Iceape\/([\d.]+).*$/, '$1')
      },
      'SeaMonkey': function () {
        return u.replace(/^.*SeaMonkey\/([\d.]+).*$/, '$1')
      },
      'Epiphany': function () {
        return u.replace(/^.*Epiphany\/([\d.]+).*$/, '$1')
      },
      '360': function () {
        return u.replace(/^.*QihooBrowser\/([\d.]+).*$/, '$1')
      },
      '360SE': function () {
        const hash = { '63': '10.0', '55': '9.1', '45': '8.1', '42': '8.0', '31': '7.0', '21': '6.3' }
        const chrome_version = u.replace(/^.*Chrome\/([\d]+).*$/, '$1')
        return hash[chrome_version] || ''
      },
      '360EE': function () {
        const hash = { '69': '11.0', '63': '9.5', '55': '9.0', '50': '8.7', '30': '7.5' }
        const chrome_version = u.replace(/^.*Chrome\/([\d]+).*$/, '$1')
        return hash[chrome_version] || ''
      },
      'Maxthon': function () {
        return u.replace(/^.*Maxthon\/([\d.]+).*$/, '$1')
      },
      'QQBrowser': function () {
        return u.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1')
      },
      'QQ': function () {
        return u.replace(/^.*QQ\/([\d.]+).*$/, '$1')
      },
      'Baidu': function () {
        return u.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, '$1')
      },
      'UC': function () {
        return u.replace(/^.*UC?Browser\/([\d.]+).*$/, '$1')
      },
      'Sogou': function () {
        return u.replace(/^.*SE ([\d.X]+).*$/, '$1').replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, '$1')
      },
      'LBBROWSER': function () {
        let version = ''
        if (u.indexOf('LieBaoFast') > -1) {
          version = u.replace(/^.*LieBaoFast\/([\d.]+).*$/, '$1')
        }
        const hash = { '57': '6.5', '49': '6.0', '46': '5.9', '42': '5.3', '39': '5.2', '34': '5.0', '29': '4.5', '21': '4.0' }
        const chrome_version = u.replace(/^.*Chrome\/([\d]+).*$/, '$1')
        return version || hash[chrome_version] || ''
      },
      '2345Explorer': function () {
        return u.replace(/^.*2345Explorer\/([\d.]+).*$/, '$1')
      },
      'TheWorld': function () {
        return u.replace(/^.*TheWorld ([\d.]+).*$/, '$1')
      },
      'XiaoMi': function () {
        return u.replace(/^.*MiuiBrowser\/([\d.]+).*$/, '$1')
      },
      'Quark': function () {
        return u.replace(/^.*Quark\/([\d.]+).*$/, '$1')
      },
      'Qiyu': function () {
        return u.replace(/^.*Qiyu\/([\d.]+).*$/, '$1')
      },
      'Wechat': function () {
        return u.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1')
      },
      'WechatWork': function () {
        return u.replace(/^.*wxwork\/([\d.]+).*$/, '$1')
      },
      'Taobao': function () {
        return u.replace(/^.*AliApp\(TB\/([\d.]+).*$/, '$1')
      },
      'Alipay': function () {
        return u.replace(/^.*AliApp\(AP\/([\d.]+).*$/, '$1')
      },
      'Weibo': function () {
        return u.replace(/^.*weibo__([\d.]+).*$/, '$1')
      },
      'Douban': function () {
        return u.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1')
      },
      'Suning': function () {
        return u.replace(/^.*SNEBUY-APP([\d.]+).*$/, '$1')
      },
      'iQiYi': function () {
        return u.replace(/^.*IqiyiVersion\/([\d.]+).*$/, '$1')
      }
    }
    _this.browserVersion = ''
    if (browerVersionMap[_this.browser]) {
      _this.browserVersion = browerVersionMap[_this.browser]()
      if (_this.browserVersion === u) {
        _this.browserVersion = ''
      }
    }
    if (_this.browser === 'Chrome' && u.match(/\S+Browser/)) {
      // eslint-disable-next-line prefer-destructuring
      _this.browser = u.match(/\S+Browser/)[0]
      _this.version = u.replace(/^.*Browser\/([\d.]+).*$/, '$1')
    }
    if (_this.browser === 'Edge') {
      if (_this.version > "75") {
        _this.engine = 'Blink'
      } else {
        _this.engine = 'EdgeHTML'
      }
    }
    if (_this.browser === 'Chrome' && parseInt(_this.browserVersion, 10) > 27) {
      _this.engine = 'Blink'
      // eslint-disable-next-line sonarjs/no-duplicated-branches
    } else if (match.Chrome && _this.engine === 'WebKit' && parseInt(statUtil.version.Chrome(), 10) > 27) {
      _this.engine = 'Blink'
      // eslint-disable-next-line sonarjs/no-duplicated-branches
    } else if (_this.browser === 'Opera' && parseInt(_this.version, 10) > 12) {
      _this.engine = 'Blink'
      // eslint-disable-next-line sonarjs/no-duplicated-branches
    } else if (_this.browser === 'Yandex') {
      _this.engine = 'Blink'
    }

    return `${_this.browser}（版本: ${_this.browserVersion}&nbsp;&nbsp;内核: ${_this.engine}）`
  }

  /** 
   * 获取系统当前的时间
   */
  private static getClientTime() {
    // 获取当前系统时间
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDay()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`
  }

  /**
   * 获取当前操作系统
   */
  private static getOS() {
    // 获取当前操作系统
    const _this = this
    this.matchInfoMap(_this)
    return _this.os
  }

  /**
   * 在信息map和匹配库中进行匹配
   */
  private static matchInfoMap(_this: statUtil) {

    const u = this.VariableLibrary.navigator.userAgent || {}
    const match = this.getMatchMap(u)
    // eslint-disable-next-line guard-for-in
    for (const s in this.VariableLibrary.infoMap) {
      for (let i = 0;i < this.VariableLibrary.infoMap[s].length;i++) {
        const value = this.VariableLibrary.infoMap[s][i]
        if (match[value]) {
          _this[s] = value
        }
      }
    }
  }


  /**
   * 获取匹配库
   */
  private static getMatchMap(u: any) {
    return {
      // 内核
      'Trident': u.indexOf('Trident') > -1 || u.indexOf('NET CLR') > -1,
      'Presto': u.indexOf('Presto') > -1,
      'WebKit': u.indexOf('AppleWebKit') > -1,
      'Gecko': u.indexOf('Gecko/') > -1,
      // 浏览器
      'Safari': u.indexOf('Safari') > -1,
      'Chrome': u.indexOf('Chrome') > -1 || u.indexOf('CriOS') > -1,
      'IE': u.indexOf('MSIE') > -1 || u.indexOf('Trident') > -1,
      'Edge': u.indexOf('Edge') > -1,
      'Firefox': u.indexOf('Firefox') > -1 || u.indexOf('FxiOS') > -1,
      'Firefox Focus': u.indexOf('Focus') > -1,
      'Chromium': u.indexOf('Chromium') > -1,
      'Opera': u.indexOf('Opera') > -1 || u.indexOf('OPR') > -1,
      'Vivaldi': u.indexOf('Vivaldi') > -1,
      'Yandex': u.indexOf('YaBrowser') > -1,
      'Arora': u.indexOf('Arora') > -1,
      'Lunascape': u.indexOf('Lunascape') > -1,
      'QupZilla': u.indexOf('QupZilla') > -1,
      'Coc Coc': u.indexOf('coc_coc_browser') > -1,
      'Kindle': u.indexOf('Kindle') > -1 || u.indexOf('Silk/') > -1,
      'Iceweasel': u.indexOf('Iceweasel') > -1,
      'Konqueror': u.indexOf('Konqueror') > -1,
      'Iceape': u.indexOf('Iceape') > -1,
      'SeaMonkey': u.indexOf('SeaMonkey') > -1,
      'Epiphany': u.indexOf('Epiphany') > -1,
      '360': u.indexOf('QihooBrowser') > -1 || u.indexOf('QHBrowser') > -1,
      '360EE': u.indexOf('360EE') > -1,
      '360SE': u.indexOf('360SE') > -1,
      'UC': u.indexOf('UC') > -1 || u.indexOf(' UBrowser') > -1,
      'QQBrowser': u.indexOf('QQBrowser') > -1,
      'QQ': u.indexOf('QQ/') > -1,
      'Baidu': u.indexOf('Baidu') > -1 || u.indexOf('BIDUBrowser') > -1,
      'Maxthon': u.indexOf('Maxthon') > -1,
      'Sogou': u.indexOf('MetaSr') > -1 || u.indexOf('Sogou') > -1,
      'LBBROWSER': u.indexOf('LBBROWSER') > -1 || u.indexOf('LieBaoFast') > -1,
      '2345Explorer': u.indexOf('2345Explorer') > -1,
      'TheWorld': u.indexOf('TheWorld') > -1,
      'XiaoMi': u.indexOf('MiuiBrowser') > -1,
      'Quark': u.indexOf('Quark') > -1,
      'Qiyu': u.indexOf('Qiyu') > -1,
      'Wechat': u.indexOf('MicroMessenger') > -1,
      'WechatWork': u.indexOf('wxwork/') > -1,
      'Taobao': u.indexOf('AliApp(TB') > -1,
      'Alipay': u.indexOf('AliApp(AP') > -1,
      'Weibo': u.indexOf('Weibo') > -1,
      'Douban': u.indexOf('com.douban.frodo') > -1,
      'Suning': u.indexOf('SNEBUY-APP') > -1,
      'iQiYi': u.indexOf('IqiyiApp') > -1,
      // 系统或平台
      'Windows': u.indexOf('Windows') > -1,
      'Linux': u.indexOf('Linux') > -1 || u.indexOf('X11') > -1,
      'Mac OS': u.indexOf('Macintosh') > -1,
      'Android': u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
      'Ubuntu': u.indexOf('Ubuntu') > -1,
      'FreeBSD': u.indexOf('FreeBSD') > -1,
      'Debian': u.indexOf('Debian') > -1,
      'Windows Phone': u.indexOf('IEMobile') > -1 || u.indexOf('Windows Phone') > -1,
      'BlackBerry': u.indexOf('BlackBerry') > -1 || u.indexOf('RIM') > -1,
      'MeeGo': u.indexOf('MeeGo') > -1,
      'Symbian': u.indexOf('Symbian') > -1,
      'iOS': u.indexOf('like Mac OS X') > -1,
      'Chrome OS': u.indexOf('CrOS') > -1,
      'WebOS': u.indexOf('hpwOS') > -1,
      // 设备
      'Mobile': u.indexOf('Mobi') > -1 || u.indexOf('iPh') > -1 || u.indexOf('480') > -1,
      'Tablet': u.indexOf('Tablet') > -1 || u.indexOf('Nexus 7') > -1,
      'iPad': u.indexOf('iPad') > -1
    }
  }

  /**
   * 
   */
  // 生成UUID通用唯一标识码
  private static createUUID() {
    const result = []
    const hexDigits = "0123456789abcdef"
    for (let i = 0;i < 36;i++) {
      result[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    // bits 12-15 of the time_hi_and_version field to 0010
    result[14] = "4"
    // bits 6-7 of the clock_seq_hi_and_reserved to 01
    // eslint-disable-next-line no-bitwise
    result[19] = hexDigits.substr((result[19] & 0x3) | 0x8, 1)
    result[8] = result[13] = result[18] = result[23] = "-"
    return result.join("")
  }

}