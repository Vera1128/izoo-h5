import { ServiceProto } from 'tsrpc-proto';
import { ReqFavoritesData, ResFavoritesData } from './Center/PtlFavoritesData';
import { ReqGetCoupon, ResGetCoupon } from './Center/PtlGetCoupon';
import { ReqListenData, ResListenData } from './Center/PtlListenData';
import { ReqOrderData, ResOrderData } from './Center/PtlOrderData';
import { ReqGetSignature, ResGetSignature } from './Config/PtlGetSignature';
import { ReqCatalogList, ResCatalogList } from './Detail/PtlCatalogList';
import { ReqCollectEvent, ResCollectEvent } from './Detail/PtlCollectEvent';
import { ReqMainDetail, ResMainDetail } from './Detail/PtlMainDetail';
import { ReqSubDetail, ResSubDetail } from './Detail/PtlSubDetail';
import { ReqTypeData, ResTypeData } from './List/PtlTypeData';
import { ReqTypeList, ResTypeList } from './List/PtlTypeList';
import { ReqCurrentUser, ResCurrentUser } from './Login/PtlCurrentUser';
import { ReqLogin, ResLogin } from './Login/PtlLogin';
import { ReqTestLogin, ResTestLogin } from './Login/PtlTestLogin';
import { ReqGetCityData, ResGetCityData } from './Main/PtlGetCityData';
import { ReqGetPopulerData, ResGetPopulerData } from './Main/PtlGetPopulerData';
import { ReqGetScrollData, ResGetScrollData } from './Main/PtlGetScrollData';
import { ReqGetTagsData, ResGetTagsData } from './Main/PtlGetTagsData';
import { ReqNearbyData, ResNearbyData } from './Main/PtlNearbyData';
import { ReqCreateOrder, ResCreateOrder } from './Order/PtlCreateOrder';
import { ReqGroupData, ResGroupData } from './Order/PtlGroupData';
import { ReqJoinGroup, ResJoinGroup } from './Order/PtlJoinGroup';
import { ReqRefreshOrder, ResRefreshOrder } from './Order/PtlRefreshOrder';
import { ReqUseCoupon, ResUseCoupon } from './Order/PtlUseCoupon';
import { ReqWxNotify, ResWxNotify } from './Order/PtlWxNotify';
import { ReqDebugPay, ResDebugPay } from './PtlDebugPay';
import { ReqLastListen, ResLastListen } from './PtlLastListen';
import { ReqListenReport, ResListenReport } from './PtlListenReport';
import { ReqSearch, ResSearch } from './PtlSearch';
import { ReqSearchHistory, ResSearchHistory } from './PtlSearchHistory';
import { ReqReportStat, ResReportStat } from './Stat/PtlReportStat';

export interface ServiceType {
    api: {
        "Center/FavoritesData": {
            req: ReqFavoritesData,
            res: ResFavoritesData
        },
        "Center/GetCoupon": {
            req: ReqGetCoupon,
            res: ResGetCoupon
        },
        "Center/ListenData": {
            req: ReqListenData,
            res: ResListenData
        },
        "Center/OrderData": {
            req: ReqOrderData,
            res: ResOrderData
        },
        "Config/GetSignature": {
            req: ReqGetSignature,
            res: ResGetSignature
        },
        "Detail/CatalogList": {
            req: ReqCatalogList,
            res: ResCatalogList
        },
        "Detail/CollectEvent": {
            req: ReqCollectEvent,
            res: ResCollectEvent
        },
        "Detail/MainDetail": {
            req: ReqMainDetail,
            res: ResMainDetail
        },
        "Detail/SubDetail": {
            req: ReqSubDetail,
            res: ResSubDetail
        },
        "List/TypeData": {
            req: ReqTypeData,
            res: ResTypeData
        },
        "List/TypeList": {
            req: ReqTypeList,
            res: ResTypeList
        },
        "Login/CurrentUser": {
            req: ReqCurrentUser,
            res: ResCurrentUser
        },
        "Login/Login": {
            req: ReqLogin,
            res: ResLogin
        },
        "Login/TestLogin": {
            req: ReqTestLogin,
            res: ResTestLogin
        },
        "Main/GetCityData": {
            req: ReqGetCityData,
            res: ResGetCityData
        },
        "Main/GetPopulerData": {
            req: ReqGetPopulerData,
            res: ResGetPopulerData
        },
        "Main/GetScrollData": {
            req: ReqGetScrollData,
            res: ResGetScrollData
        },
        "Main/GetTagsData": {
            req: ReqGetTagsData,
            res: ResGetTagsData
        },
        "Main/NearbyData": {
            req: ReqNearbyData,
            res: ResNearbyData
        },
        "Order/CreateOrder": {
            req: ReqCreateOrder,
            res: ResCreateOrder
        },
        "Order/GroupData": {
            req: ReqGroupData,
            res: ResGroupData
        },
        "Order/JoinGroup": {
            req: ReqJoinGroup,
            res: ResJoinGroup
        },
        "Order/RefreshOrder": {
            req: ReqRefreshOrder,
            res: ResRefreshOrder
        },
        "Order/UseCoupon": {
            req: ReqUseCoupon,
            res: ResUseCoupon
        },
        "Order/WxNotify": {
            req: ReqWxNotify,
            res: ResWxNotify
        },
        "DebugPay": {
            req: ReqDebugPay,
            res: ResDebugPay
        },
        "LastListen": {
            req: ReqLastListen,
            res: ResLastListen
        },
        "ListenReport": {
            req: ReqListenReport,
            res: ResListenReport
        },
        "Search": {
            req: ReqSearch,
            res: ResSearch
        },
        "SearchHistory": {
            req: ReqSearchHistory,
            res: ResSearchHistory
        },
        "Stat/ReportStat": {
            req: ReqReportStat,
            res: ResReportStat
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 82,
    "services": [
        {
            "id": 16,
            "name": "Center/FavoritesData",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 34,
            "name": "Center/GetCoupon",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 17,
            "name": "Center/ListenData",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 23,
            "name": "Center/OrderData",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 3,
            "name": "Config/GetSignature",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 30,
            "name": "Detail/CatalogList",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 14,
            "name": "Detail/CollectEvent",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 13,
            "name": "Detail/MainDetail",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 21,
            "name": "Detail/SubDetail",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 11,
            "name": "List/TypeData",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 12,
            "name": "List/TypeList",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 31,
            "name": "Login/CurrentUser",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 2,
            "name": "Login/Login",
            "type": "api",
            "conf": {
                "needLogin": false
            }
        },
        {
            "id": 4,
            "name": "Login/TestLogin",
            "type": "api",
            "conf": {
                "needLogin": false
            }
        },
        {
            "id": 7,
            "name": "Main/GetCityData",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 8,
            "name": "Main/GetPopulerData",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 5,
            "name": "Main/GetScrollData",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 6,
            "name": "Main/GetTagsData",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 9,
            "name": "Main/NearbyData",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 18,
            "name": "Order/CreateOrder",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 20,
            "name": "Order/GroupData",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 22,
            "name": "Order/JoinGroup",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 19,
            "name": "Order/RefreshOrder",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 36,
            "name": "Order/UseCoupon",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 35,
            "name": "Order/WxNotify",
            "type": "api",
            "conf": {
                "needLogin": false
            }
        },
        {
            "id": 32,
            "name": "DebugPay",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 28,
            "name": "LastListen",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 25,
            "name": "ListenReport",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 10,
            "name": "Search",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 29,
            "name": "SearchHistory",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        },
        {
            "id": 33,
            "name": "Stat/ReportStat",
            "type": "api",
            "conf": {
                "needLogin": true
            }
        }
    ],
    "types": {
        "Center/PtlFavoritesData/ReqFavoritesData": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ]
        },
        "Base/BaseRequest": {
            "type": "Interface",
            "properties": [
                {
                    "id": 2,
                    "name": "sso",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "Center/PtlFavoritesData/ResFavoritesData": {
            "type": "Reference",
            "target": "PtlSearch/ResSearch"
        },
        "PtlSearch/ResSearch": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "PtlSearch/searchItem"
                        }
                    }
                }
            ]
        },
        "Base/BaseResponse": {
            "type": "Interface",
            "properties": [
                {
                    "id": 2,
                    "name": "sso",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "PtlSearch/searchItem": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "mainClassId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "title",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 8,
                    "name": "desc",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 6,
                    "name": "scrollImage",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "tags",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                },
                {
                    "id": 4,
                    "name": "city",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "Center/PtlGetCoupon/ReqGetCoupon": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ]
        },
        "Center/PtlGetCoupon/ResGetCoupon": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "Center/PtlGetCoupon/couponItem"
                        }
                    }
                }
            ]
        },
        "Center/PtlGetCoupon/couponItem": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "couponId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "name",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "state",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Literal",
                                    "literal": "expired"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Literal",
                                    "literal": "wait"
                                }
                            },
                            {
                                "id": 2,
                                "type": {
                                    "type": "Literal",
                                    "literal": "used"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 3,
                    "name": "sTime",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "eTime",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "Center/PtlListenData/ReqListenData": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ]
        },
        "Center/PtlListenData/ResListenData": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "Center/PtlListenData/listenItem"
                        }
                    }
                }
            ]
        },
        "Center/PtlListenData/listenItem": {
            "type": "Intersection",
            "members": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Main/PtlGetPopulerData/populerItem"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "lastListenTime",
                                "type": {
                                    "type": "String"
                                },
                                "optional": true
                            }
                        ]
                    }
                }
            ]
        },
        "Main/PtlGetPopulerData/populerItem": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "mainClassId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "title",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "desc",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "tags",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                },
                {
                    "id": 7,
                    "name": "duration",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 5,
                    "name": "totals",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 10,
                    "name": "scrollImage",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 8,
                    "name": "distance",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "Center/PtlOrderData/ReqOrderData": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ]
        },
        "Center/PtlOrderData/ResOrderData": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "Center/PtlOrderData/orderDataItem"
                        }
                    }
                }
            ]
        },
        "Center/PtlOrderData/orderDataItem": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "title",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 7,
                    "name": "desc",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 8,
                    "name": "mainClassId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "imageUrl",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "amount",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "avgAmount",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 4,
                    "name": "orderId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 10,
                    "name": "groupId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 5,
                    "name": "createTime",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 6,
                    "name": "state",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Literal",
                                    "literal": "success"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Literal",
                                    "literal": "fail"
                                }
                            },
                            {
                                "id": 2,
                                "type": {
                                    "type": "Literal",
                                    "literal": "wait"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 9,
                    "name": "type",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Literal",
                                    "literal": "group"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Literal",
                                    "literal": "single"
                                }
                            },
                            {
                                "id": 2,
                                "type": {
                                    "type": "Literal",
                                    "literal": "join"
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "Config/PtlGetSignature/ReqGetSignature": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "url",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "Config/PtlGetSignature/ResGetSignature": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 1,
                    "name": "appId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "timestamp",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "nonceStr",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 0,
                    "name": "signature",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "jsApiList",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                }
            ]
        },
        "Detail/PtlCatalogList/ReqCatalogList": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "mainClassId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "Detail/PtlCatalogList/ResCatalogList": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "Detail/PtlCatalogList/catalogListItem"
                        }
                    }
                }
            ]
        },
        "Detail/PtlCatalogList/catalogListItem": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "subId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "title",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "iconUri",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "isAudition",
                    "type": {
                        "type": "Boolean"
                    },
                    "optional": true
                },
                {
                    "id": 4,
                    "name": "audioUri",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 5,
                    "name": "duration",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                }
            ]
        },
        "Detail/PtlCollectEvent/ReqCollectEvent": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "mainClassId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "Detail/PtlCollectEvent/ResCollectEvent": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "state",
                    "type": {
                        "type": "Boolean"
                    }
                }
            ]
        },
        "Detail/PtlMainDetail/ReqMainDetail": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "mainClassId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "Detail/PtlMainDetail/ResMainDetail": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "info",
                    "type": {
                        "type": "Reference",
                        "target": "Detail/PtlMainDetail/mainDetailItem"
                    }
                },
                {
                    "id": 2,
                    "name": "isCollect",
                    "type": {
                        "type": "Boolean"
                    }
                },
                {
                    "id": 3,
                    "name": "isPayment",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Literal",
                                    "literal": "true"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Literal",
                                    "literal": "false"
                                }
                            },
                            {
                                "id": 2,
                                "type": {
                                    "type": "Literal",
                                    "literal": "wait"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 4,
                    "name": "duration",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 5,
                    "name": "totals",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "Detail/PtlMainDetail/mainDetailItem": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "title",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 15,
                    "name": "desc",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "address",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "time",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "tickets",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 5,
                    "name": "tags",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                },
                {
                    "id": 6,
                    "name": "isCharge",
                    "type": {
                        "type": "Boolean"
                    }
                },
                {
                    "id": 7,
                    "name": "amount",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 8,
                    "name": "avgAmount",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 14,
                    "name": "nums",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 9,
                    "name": "scrollImages",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                },
                {
                    "id": 10,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 13,
                    "name": "city",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "Detail/PtlSubDetail/ReqSubDetail": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "mainClassId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "subId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "Detail/PtlSubDetail/ResSubDetail": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "title",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "address",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "subTitle",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "imagesList",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                },
                {
                    "id": 4,
                    "name": "videosList",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                },
                {
                    "id": 5,
                    "name": "extraImagesList",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                }
            ]
        },
        "List/PtlTypeData/ReqTypeData": {
            "type": "Intersection",
            "members": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "List/PtlTypeList/ReqTypeList"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "Interface",
                        "properties": [
                            {
                                "id": 0,
                                "name": "value",
                                "type": {
                                    "type": "String"
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "List/PtlTypeList/ReqTypeList": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "type",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Literal",
                                    "literal": "city"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Literal",
                                    "literal": "tag"
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "List/PtlTypeData/ResTypeData": {
            "type": "Reference",
            "target": "PtlSearch/ResSearch"
        },
        "List/PtlTypeList/ResTypeList": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                }
            ]
        },
        "Login/PtlCurrentUser/ReqCurrentUser": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ]
        },
        "Login/PtlCurrentUser/ResCurrentUser": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "info",
                    "type": {
                        "type": "Intersection",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Reference",
                                    "target": "models/CurrentUser/CurrentUser"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Interface",
                                    "properties": [
                                        {
                                            "id": 0,
                                            "name": "uid",
                                            "type": {
                                                "type": "Number"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "models/CurrentUser/CurrentUser": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "nickName",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "avatar",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "gender",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 3,
                    "name": "phone",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 4,
                    "name": "province",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 5,
                    "name": "city",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 6,
                    "name": "country",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "Login/PtlLogin/ReqLogin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "code",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "Login/PtlLogin/ResLogin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "info",
                    "type": {
                        "type": "Intersection",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Reference",
                                    "target": "models/CurrentUser/CurrentUser"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Interface",
                                    "properties": [
                                        {
                                            "id": 0,
                                            "name": "userId",
                                            "type": {
                                                "type": "Number"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "Login/PtlTestLogin/ReqTestLogin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "userId",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "Login/PtlTestLogin/ResTestLogin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "info",
                    "type": {
                        "type": "Intersection",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Reference",
                                    "target": "models/CurrentUser/CurrentUser"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Interface",
                                    "properties": [
                                        {
                                            "id": 0,
                                            "name": "userId",
                                            "type": {
                                                "type": "Number"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "Main/PtlGetCityData/ReqGetCityData": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ]
        },
        "Main/PtlGetCityData/ResGetCityData": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "Main/PtlGetCityData/cityItem"
                        }
                    }
                }
            ]
        },
        "Main/PtlGetCityData/cityItem": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "city",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "poster",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "Main/PtlGetPopulerData/ReqGetPopulerData": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ]
        },
        "Main/PtlGetPopulerData/ResGetPopulerData": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "Main/PtlGetPopulerData/populerItem"
                        }
                    }
                }
            ]
        },
        "Main/PtlGetScrollData/ReqGetScrollData": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ]
        },
        "Main/PtlGetScrollData/ResGetScrollData": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "Main/PtlGetScrollData/scrollItem"
                        }
                    }
                }
            ]
        },
        "Main/PtlGetScrollData/scrollItem": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "mainClassId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "scrollImg",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "Main/PtlGetTagsData/ReqGetTagsData": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ]
        },
        "Main/PtlGetTagsData/ResGetTagsData": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "Main/PtlGetTagsData/tagsItem"
                        }
                    }
                }
            ]
        },
        "Main/PtlGetTagsData/tagsItem": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "_id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "tag",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "icon",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "Main/PtlNearbyData/ReqNearbyData": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "longitude",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "latitude",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "Main/PtlNearbyData/ResNearbyData": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "list",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "Reference",
                            "target": "Main/PtlGetPopulerData/populerItem"
                        }
                    }
                }
            ]
        },
        "Order/PtlCreateOrder/ReqCreateOrder": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "type",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Literal",
                                    "literal": "group"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Literal",
                                    "literal": "single"
                                }
                            },
                            {
                                "id": 2,
                                "type": {
                                    "type": "Literal",
                                    "literal": "join"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 1,
                    "name": "mainClassId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "phone",
                    "type": {
                        "type": "Number"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "groupOrderId",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "Order/PtlCreateOrder/ResCreateOrder": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 11,
                    "name": "timestamp",
                    "type": {
                        "type": "Number"
                    }
                },
                {
                    "id": 5,
                    "name": "signType",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 10,
                    "name": "appId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 6,
                    "name": "nonceStr",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "prepay_id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 7,
                    "name": "paySign",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 8,
                    "name": "orderId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "Order/PtlGroupData/ReqGroupData": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "groupId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "Order/PtlGroupData/ResGroupData": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "mainClassInfo",
                    "type": {
                        "type": "Intersection",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "target": {
                                        "type": "Reference",
                                        "target": "Main/PtlGetPopulerData/populerItem"
                                    },
                                    "keys": [
                                        "mainClassId",
                                        "title",
                                        "tags",
                                        "duration",
                                        "totals"
                                    ],
                                    "type": "Pick"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Interface",
                                    "properties": [
                                        {
                                            "id": 0,
                                            "name": "amount",
                                            "type": {
                                                "type": "Number"
                                            }
                                        },
                                        {
                                            "id": 1,
                                            "name": "avgAmount",
                                            "type": {
                                                "type": "Number"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 1,
                    "name": "ownerAvatar",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "joinAvatar",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "type",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Literal",
                                    "literal": "wait"
                                }
                            },
                            {
                                "id": 5,
                                "type": {
                                    "type": "Literal",
                                    "literal": "join"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Literal",
                                    "literal": "failed"
                                }
                            },
                            {
                                "id": 2,
                                "type": {
                                    "type": "Literal",
                                    "literal": "success"
                                }
                            },
                            {
                                "id": 3,
                                "type": {
                                    "type": "Literal",
                                    "literal": "overload"
                                }
                            },
                            {
                                "id": 4,
                                "type": {
                                    "type": "Literal",
                                    "literal": "create"
                                }
                            }
                        ]
                    }
                },
                {
                    "id": 4,
                    "name": "endTime",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "Order/PtlJoinGroup/ReqJoinGroup": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "groupId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "Order/PtlJoinGroup/ResJoinGroup": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ]
        },
        "Order/PtlRefreshOrder/ReqRefreshOrder": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "orderId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "Order/PtlRefreshOrder/ResRefreshOrder": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "groupId",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                }
            ]
        },
        "Order/PtlUseCoupon/ReqUseCoupon": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 1,
                    "name": "mainClassId",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "Order/PtlUseCoupon/ResUseCoupon": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ]
        },
        "Order/PtlWxNotify/ReqWxNotify": {
            "type": "Any"
        },
        "Order/PtlWxNotify/ResWxNotify": {
            "type": "Any"
        },
        "PtlDebugPay/ReqDebugPay": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ]
        },
        "PtlDebugPay/ResDebugPay": {
            "type": "Reference",
            "target": "Order/PtlCreateOrder/ResCreateOrder"
        },
        "PtlLastListen/ReqLastListen": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ]
        },
        "PtlLastListen/ResLastListen": {
            "type": "Union",
            "members": [
                {
                    "id": 0,
                    "type": {
                        "target": {
                            "type": "Reference",
                            "target": "Detail/PtlSubDetail/ReqSubDetail"
                        },
                        "keys": [
                            "mainClassId",
                            "subId"
                        ],
                        "type": "Pick"
                    }
                },
                {
                    "id": 1,
                    "type": {
                        "type": "Interface"
                    }
                }
            ]
        },
        "PtlListenReport/ReqListenReport": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "mainClassId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "subId",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 2,
                    "name": "duration",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "PtlListenReport/ResListenReport": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ]
        },
        "PtlSearch/ReqSearch": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "content",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlSearchHistory/ReqSearchHistory": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "action",
                    "type": {
                        "type": "Union",
                        "members": [
                            {
                                "id": 0,
                                "type": {
                                    "type": "Literal",
                                    "literal": "get"
                                }
                            },
                            {
                                "id": 1,
                                "type": {
                                    "type": "Literal",
                                    "literal": "clear"
                                }
                            }
                        ]
                    }
                }
            ]
        },
        "PtlSearchHistory/ResSearchHistory": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "history",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                },
                {
                    "id": 1,
                    "name": "hot",
                    "type": {
                        "type": "Array",
                        "elementType": {
                            "type": "String"
                        }
                    }
                }
            ]
        },
        "Stat/PtlReportStat/ReqReportStat": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 1,
                    "name": "action",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 0,
                    "name": "isFirstDay",
                    "type": {
                        "type": "Boolean"
                    }
                },
                {
                    "id": 2,
                    "name": "data",
                    "type": {
                        "type": "Interface",
                        "indexSignature": {
                            "keyType": "String",
                            "type": {
                                "type": "Any"
                            }
                        }
                    },
                    "optional": true
                }
            ]
        },
        "Stat/PtlReportStat/ResReportStat": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "Base/BaseResponse"
                    }
                }
            ]
        }
    }
};