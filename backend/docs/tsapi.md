
# TSRPC API 接口文档

## 通用说明

- 所有请求方法均为 `POST`
- 所有请求均需加入以下 Header :
    - `Content-Type: application/json`

## 目录

- Center
    - [FavoritesList 请求-[获取用户收藏list]](#/Center/FavoritesData)
    - [GetCoupon 请求-[获取用户自己的优惠券数据]](#/Center/GetCoupon)
    - [ListenData 请求-[获取个人中心收听记录]](#/Center/ListenData)
    - [OrderData 请求-[用户支付订单数据]](#/Center/OrderData)
- Config
    - [GetSignature 请求-[获取 wx.config 的加密签名]](#/Config/GetSignature)
- Detail
    - [CatalogList 请求-[获取目录]](#/Detail/CatalogList)
    - [CollectEvent 请求-[收藏改内容]](#/Detail/CollectEvent)
    - [MainDetail 请求-[内容详情接口]](#/Detail/MainDetail)
    - [SubDetail 请求-[进入景点收听页]](#/Detail/SubDetail)
- List
    - [TypeData 请求-[切换主题 list]](#/List/TypeData)
    - [TypeList 请求-[切换主题]](#/List/TypeList)
- Login
    - [CurrentUser 请求-[获取当前用户的信息]](#/Login/CurrentUser)
    - [Login 请求-[正式服登录]](#/Login/Login)
    - [Login 请求-[测试登录]](#/Login/TestLogin)
- Main
    - [GetCityData 请求-[获取城市路线数据]](#/Main/GetCityData)
    - [GetPopulerData 请求-[获取热门数据]](#/Main/GetPopulerData)
    - [GetScrollData 请求-[获取首页轮播图信息]](#/Main/GetScrollData)
    - [GetTagsData 请求-[获取主题配置]](#/Main/GetTagsData)
    - [GetScrollData 请求-[获取附近的内容数据]](#/Main/NearbyData)
- Order
    - [CreateOrder 请求-[提交支付订单]](#/Order/CreateOrder)
    - [GroupData 请求-[个人中心-获取团购订单数据]](#/Order/GroupData)
    - [JoinGroup 请求-[加入团购]](#/Order/JoinGroup)
    - [RefreshOrder 请求-[刷新获取支付订单的数据, 判断是否支付,返回团购唯一 id]](#/Order/RefreshOrder)
    - [UseCoupon 请求-[使用优惠券]](#/Order/UseCoupon)
    - [WxNotify 请求-[支付成功后的回调]](#/Order/WxNotify)
- Stat
    - [ReportStat 请求-[日志数据上报]](#/Stat/ReportStat)
- [DebugPay 请求-[测试支付]](#/DebugPay)
- [LastListen 请求-[获取上次收听的内容数据]](#/LastListen)
- [ListenReport 请求-[收听内容信息上报]](#/ListenReport)
- [Search 请求-[搜索接口]](#/Search)
- [SearchHistory 请求-[搜索记录]](#/SearchHistory)

---

## Center

### FavoritesList 请求-[获取用户收藏list] <a id="/Center/FavoritesData"></a>

**路径**
- POST `/Center/FavoritesData`

**请求**
```ts
interface ReqFavoritesData {
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResFavoritesData {
    list: {
        /** 内容唯一 id */
        mainClassId: string,
        /** 标题 */
        title: string,
        /** 详情 */
        desc: string,
        /** 图片 */
        scrollImage: string,
        /** 标签 */
        tags: string[],
        /** 城市 */
        city: string
    }[],
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

### GetCoupon 请求-[获取用户自己的优惠券数据] <a id="/Center/GetCoupon"></a>

**路径**
- POST `/Center/GetCoupon`

**请求**
```ts
interface ReqGetCoupon {
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResGetCoupon {
    list: {
        /** 优惠券的唯一 id */
        couponId: string,
        /** 优惠券名称 */
        name: string,
        /**
        * 优惠券的状态
        * expired: 过期
        * wait: 未使用
        * used: 已使用
        */
        state: "expired" | "wait" | "used",
        /** 开始时间 */
        sTime: string,
        /** 截止时间 */
        eTime: string
    }[],
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

### ListenData 请求-[获取个人中心收听记录] <a id="/Center/ListenData"></a>

**路径**
- POST `/Center/ListenData`

**请求**
```ts
interface ReqListenData {
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResListenData {
    list: ({
        /** 内容唯一 id */
        mainClassId: string,
        /** 标题 */
        title: string,
        /** 简介 */
        desc: string,
        /** 标签 */
        tags: string[],
        /** 音频总时长 (单位 秒 -> 使用需转分钟) */
        duration: number,
        /** 内容条数 */
        totals: number,
        /** 内容图片 */
        scrollImage: string,
        /** 距离 */
        distance?: number
    } & { lastListenTime?: string })[]
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

### OrderData 请求-[用户支付订单数据] <a id="/Center/OrderData"></a>

**路径**
- POST `/Center/OrderData`

**请求**
```ts
interface ReqOrderData {
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResOrderData {
    list: {
        /** 景点名称 */
        title: string,
        /** 景点描述 */
        desc: string,
        /** 内容唯一 id */
        mainClassId: string,
        /** 景点icon */
        imageUrl: string,
        /** 单买价格 */
        amount: number,
        /** 团购价格 */
        avgAmount: number,
        /** 订单唯一id */
        orderId: string,
        /** 订单创建时间 */
        createTime: number,
        /**
        * 购买状态
        * success: 成功
        * fail: 失败
        * wait: 等待中
        */
        state: "success" | "fail" | "wait",
        /** 订单类型 */
        type: "group" | "single" | "join"
    }[],
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

## Config

### GetSignature 请求-[获取 wx.config 的加密签名] <a id="/Config/GetSignature"></a>

**路径**
- POST `/Config/GetSignature`

**请求**
```ts
interface ReqGetSignature {
    /** 当前页面的地址， 不可保留#以后的数据 */
    url: string,
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResGetSignature {
    /** appId */
    appId: string,
    /** 时间戳 */
    timestamp: string,
    /** 随机数 */
    nonceStr: string,
    /** 加密签名 */
    signature: string,
    /** JS接口列表 */
    jsApiList: string[],
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

## Detail

### CatalogList 请求-[获取目录] <a id="/Detail/CatalogList"></a>

**路径**
- POST `/Detail/CatalogList`

**请求**
```ts
interface ReqCatalogList {
    /** 内容唯一 id */
    mainClassId: string,
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResCatalogList {
    list: {
        /** 目录唯一 id */
        subId: string,
        /** 目录名称 */
        title: string,
        /** 目录 icon */
        iconUri: string,
        /** 是否开启试听 true: 开启, false: 关闭 */
        isAudition?: boolean,
        /** 音频地址 */
        audioUri?: string,
        /** 时长 */
        duration?: number
    }[],
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

### CollectEvent 请求-[收藏改内容] <a id="/Detail/CollectEvent"></a>

**路径**
- POST `/Detail/CollectEvent`

**请求**
```ts
interface ReqCollectEvent {
    /** 景点内容唯一 id */
    mainClassId: string,
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResCollectEvent {
    /** 收藏状态: true: 已收藏 false: 未收藏 */
    state: boolean,
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

### MainDetail 请求-[内容详情接口] <a id="/Detail/MainDetail"></a>

**路径**
- POST `/Detail/MainDetail`

**请求**
```ts
interface ReqMainDetail {
    /** 内容唯一 id */
    mainClassId: string,
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResMainDetail {
    /** 景点详情 */
    info: {
        /** 名称 */
        title: string,
        /** 景点描述 */
        desc: string,
        /** 具体位置 */
        address: string,
        /** 运营时间 */
        time: string,
        /** 门票信息 */
        tickets: string,
        /** 标签 */
        tags: string[],
        /** 是否收费 */
        isCharge: boolean,
        /** 金额 */
        amount?: number,
        /** 拼团金额 */
        avgAmount?: number,
        /** 参与拼团人数 */
        nums?: number,
        /** 轮播图片 */
        scrollImages: string[],
        /** 内容简介 */
        content: string,
        /** 城市 */
        city: string
    },
    /** 是否收藏 true: 已收藏 false: 未收藏 */
    isCollect: boolean,
    /** 是否购买 true: 已支付 false: 未支付 */
    isPayment: boolean,
    /** 音频总时长 (单位 秒 -> 使用需转分钟) */
    duration: number,
    /** 内容条数 */
    totals: number,
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

### SubDetail 请求-[进入景点收听页] <a id="/Detail/SubDetail"></a>

**路径**
- POST `/Detail/SubDetail`

**请求**
```ts
interface ReqSubDetail {
    /** 景点内容唯一 id */
    mainClassId: string,
    /** 子目录内容唯一 id */
    subId: string,
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResSubDetail {
    /** 景点标题 */
    title: string,
    /** 景点位置 */
    address: string,
    /** 目录名称 */
    subTitle: string,
    /** 轮播图 */
    imagesList: string[],
    /** 音频文件 */
    videosList: string[],
    /** 额外图片 */
    extraImagesList: string[],
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

## List

### TypeData 请求-[切换主题 list] <a id="/List/TypeData"></a>

**路径**
- POST `/List/TypeData`

**请求**
```ts
type ReqTypeData = {
    /** 切换主题 */
    type: "city" | "tag",
    /** 登录态 */
    sso?: string
} & {/** type list value */
    value: string
}
```

**响应**
```ts
interface ResTypeData {
    list: {
        /** 内容唯一 id */
        mainClassId: string,
        /** 标题 */
        title: string,
        /** 详情 */
        desc: string,
        /** 图片 */
        scrollImage: string,
        /** 标签 */
        tags: string[],
        /** 城市 */
        city: string
    }[],
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

### TypeList 请求-[切换主题] <a id="/List/TypeList"></a>

**路径**
- POST `/List/TypeList`

**请求**
```ts
interface ReqTypeList {
    /** 切换主题 */
    type: "city" | "tag",
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResTypeList {
    list: string[],
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

## Login

### CurrentUser 请求-[获取当前用户的信息] <a id="/Login/CurrentUser"></a>

**路径**
- POST `/Login/CurrentUser`

**请求**
```ts
interface ReqCurrentUser {
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResCurrentUser {
    info: {
        /** 昵称 */
        nickName: string,
        /** 头像 */
        avatar: string,
        /** 性别 */
        gender: number,
        /** 电话 */
        phone?: number,
        /** 省份 */
        province: string,
        /** 城市 */
        city: string,
        /** 国家 */
        country: string
    } & { uid: number },
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

### Login 请求-[正式服登录] <a id="/Login/Login"></a>

**路径**
- POST `/Login/Login`

**请求**
```ts
interface ReqLogin {
    /** 客户端重定向code */
    code: string,
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResLogin {
    info: {
        /** 昵称 */
        nickName: string,
        /** 头像 */
        avatar: string,
        /** 性别 */
        gender: number,
        /** 电话 */
        phone?: number,
        /** 省份 */
        province: string,
        /** 城市 */
        city: string,
        /** 国家 */
        country: string
    } & { userId: number },
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": false
}
```

---

### Login 请求-[测试登录] <a id="/Login/TestLogin"></a>

**路径**
- POST `/Login/TestLogin`

**请求**
```ts
interface ReqTestLogin {
    userId: number,
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResTestLogin {
    info: {
        /** 昵称 */
        nickName: string,
        /** 头像 */
        avatar: string,
        /** 性别 */
        gender: number,
        /** 电话 */
        phone?: number,
        /** 省份 */
        province: string,
        /** 城市 */
        city: string,
        /** 国家 */
        country: string
    },
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": false
}
```

---

## Main

### GetCityData 请求-[获取城市路线数据] <a id="/Main/GetCityData"></a>

**路径**
- POST `/Main/GetCityData`

**请求**
```ts
interface ReqGetCityData {
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResGetCityData {
    list: {
        /** 城市 */
        city: string,
        /** 海报图 */
        poster: string
    }[],
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

### GetPopulerData 请求-[获取热门数据] <a id="/Main/GetPopulerData"></a>

**路径**
- POST `/Main/GetPopulerData`

**请求**
```ts
interface ReqGetPopulerData {
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResGetPopulerData {
    list: {
        /** 内容唯一 id */
        mainClassId: string,
        /** 标题 */
        title: string,
        /** 简介 */
        desc: string,
        /** 标签 */
        tags: string[],
        /** 音频总时长 (单位 秒 -> 使用需转分钟) */
        duration: number,
        /** 内容条数 */
        totals: number,
        /** 内容图片 */
        scrollImage: string,
        /** 距离 */
        distance?: number
    }[],
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

### GetScrollData 请求-[获取首页轮播图信息] <a id="/Main/GetScrollData"></a>

**路径**
- POST `/Main/GetScrollData`

**请求**
```ts
interface ReqGetScrollData {
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResGetScrollData {
    list: {
        mainClassId: string,
        scrollImg: string
    }[],
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

### GetTagsData 请求-[获取主题配置] <a id="/Main/GetTagsData"></a>

**路径**
- POST `/Main/GetTagsData`

**请求**
```ts
interface ReqGetTagsData {
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResGetTagsData {
    list: {
        /** 主题唯一 id */
        _id: string,
        /** 主题名称 */
        tag: string,
        /** 主图图片 */
        icon: string
    }[],
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

### GetScrollData 请求-[获取附近的内容数据] <a id="/Main/NearbyData"></a>

**路径**
- POST `/Main/NearbyData`

**请求**
```ts
interface ReqNearbyData {
    /** 经度 */
    longitude: string,
    /** 纬度 */
    latitude: string,
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResNearbyData {
    list: {
        /** 内容唯一 id */
        mainClassId: string,
        /** 标题 */
        title: string,
        /** 简介 */
        desc: string,
        /** 标签 */
        tags: string[],
        /** 音频总时长 (单位 秒 -> 使用需转分钟) */
        duration: number,
        /** 内容条数 */
        totals: number,
        /** 内容图片 */
        scrollImage: string,
        /** 距离 */
        distance?: number
    }[],
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

## Order

### CreateOrder 请求-[提交支付订单] <a id="/Order/CreateOrder"></a>

**路径**
- POST `/Order/CreateOrder`

**请求**
```ts
interface ReqCreateOrder {
    /**
    * type: 订单类型
    * group: 团购
    * single: 单买
    * join: 加入团购
    */
    type: "group" | "single" | "join",
    /** 景点唯一 id */
    mainClassId: string,
    /** 手机号 */
    phone?: number,
    /** 团购订单的唯一orderId type === join 时携带 */
    groupOrderId?: string,
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResCreateOrder {
    /** 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符 */
    timestamp: number,
    /** 微信支付V3的传入RSA,微信支付V2的传入格式与V2统一下单的签名格式保持一致 */
    signType: string,
    /** 公众号ID，由商户传入 */
    appId: string,
    /** 随机串 */
    nonceStr: string,
    /** JSAPI下单接口返回的prepay_id参数值 */
    prepay_id: string,
    /** 签名 */
    paySign: string,
    /** 唯一订单 id */
    orderId: string,
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

### GroupData 请求-[个人中心-获取团购订单数据] <a id="/Order/GroupData"></a>

**路径**
- POST `/Order/GroupData`

**请求**
```ts
interface ReqGroupData {
    /** 团购唯一 id */
    groupId: string,
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResGroupData {
    mainClassInfo: {
        /** 内容唯一 id */
        mainClassId: string,
        /** 标题 */
        title: string,
        /** 标签 */
        tags: string[],
        /** 音频总时长 (单位 秒 -> 使用需转分钟) */
        duration: number,
        /** 内容条数 */
        totals: number
    } & {
        /** 金额 */
        amount: number,
        /** 拼团金额 */
        avgAmount: number
    },
    /** 团长头像 */
    ownerAvatar: string,
    /** 参与者头像 */
    joinAvatar?: string,
    /**
    * 团购订单状态
    * wait: 等待中,待参与团购 [自己二次进入后的状态]
    * join: 加入团购 [邀请者加入的状态]
    * failed: 团购订单失败,到期并无人参与 [所有人进入后的状态]
    * overload: 满额,团购成功 [ 自己和参与者进入后状态 ]
    * success: 团购成功 [ 参与者进入后的状态 ]
    * create: 发起团购 [第三则进入后状态]
    */
    type: "wait" | "join" | "failed" | "success" | "overload" | "create",
    /** 团购订单结束时间 */
    endTime: number,
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

### JoinGroup 请求-[加入团购] <a id="/Order/JoinGroup"></a>

**路径**
- POST `/Order/JoinGroup`

**请求**
```ts
interface ReqJoinGroup {
    groupId: string,
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResJoinGroup {
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

### RefreshOrder 请求-[刷新获取支付订单的数据, 判断是否支付,返回团购唯一 id] <a id="/Order/RefreshOrder"></a>

**路径**
- POST `/Order/RefreshOrder`

**请求**
```ts
interface ReqRefreshOrder {
    /** 订单id */
    orderId: string,
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResRefreshOrder {
    /**
    * 团购 id
    * 仅团购订单存在.
    * 通过团购 id 进行参团的分享
    */
    groupId?: string,
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

### UseCoupon 请求-[使用优惠券] <a id="/Order/UseCoupon"></a>

**路径**
- POST `/Order/UseCoupon`

**请求**
```ts
interface ReqUseCoupon {
    /** 景点唯一 id */
    mainClassId: string,
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResUseCoupon {
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

### WxNotify 请求-[支付成功后的回调] <a id="/Order/WxNotify"></a>

**路径**
- POST `/Order/WxNotify`

**请求**
```ts
type ReqWxNotify = any
```

**响应**
```ts
type ResWxNotify = any
```

**配置**
```ts
{
  "needLogin": false
}
```

---

## Stat

### ReportStat 请求-[日志数据上报] <a id="/Stat/ReportStat"></a>

**路径**
- POST `/Stat/ReportStat`

**请求**
```ts
interface ReqReportStat {
    /** 是否当日首次上报 true: 第一次  false: 已经不是第一次了 */
    isFirstDay: boolean,
    /** 埋点行为 */
    action: string,
    /** 拓展数据 (带规划) 例如: C端时长 */
    data?: { [key: string]: any },
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResReportStat {
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

## DebugPay 请求-[测试支付] <a id="/DebugPay"></a>

**路径**
- POST `/DebugPay`

**请求**
```ts
interface ReqDebugPay {
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResDebugPay {
    /** 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符 */
    timestamp: number,
    /** 微信支付V3的传入RSA,微信支付V2的传入格式与V2统一下单的签名格式保持一致 */
    signType: string,
    /** 公众号ID，由商户传入 */
    appId: string,
    /** 随机串 */
    nonceStr: string,
    /** JSAPI下单接口返回的prepay_id参数值 */
    prepay_id: string,
    /** 签名 */
    paySign: string,
    /** 唯一订单 id */
    orderId: string,
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

## LastListen 请求-[获取上次收听的内容数据] <a id="/LastListen"></a>

**路径**
- POST `/LastListen`

**请求**
```ts
interface ReqLastListen {
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
type ResLastListen = {
    /** 景点内容唯一 id */
    mainClassId: string,
    /** 子目录内容唯一 id */
    subId: string
} | {}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

## ListenReport 请求-[收听内容信息上报] <a id="/ListenReport"></a>

**路径**
- POST `/ListenReport`

**请求**
```ts
interface ReqListenReport {
    /** 内容唯一主 id */
    mainClassId: string,
    /** 目录唯一 id */
    subId?: string,
    /** 收听时长 秒单位 */
    duration: number,
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResListenReport {
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

## Search 请求-[搜索接口] <a id="/Search"></a>

**路径**
- POST `/Search`

**请求**
```ts
interface ReqSearch {
    /** 搜索内容 */
    content: string,
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResSearch {
    list: {
        /** 内容唯一 id */
        mainClassId: string,
        /** 标题 */
        title: string,
        /** 详情 */
        desc: string,
        /** 图片 */
        scrollImage: string,
        /** 标签 */
        tags: string[],
        /** 城市 */
        city: string
    }[],
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

---

## SearchHistory 请求-[搜索记录] <a id="/SearchHistory"></a>

**路径**
- POST `/SearchHistory`

**请求**
```ts
interface ReqSearchHistory {
    action: "get" | "clear",
    /** 登录态 */
    sso?: string
}
```

**响应**
```ts
interface ResSearchHistory {
    history: string[],
    hot: string[],
    /** 登录态 */
    sso?: string
}
```

**配置**
```ts
{
  "needLogin": true
}
```

