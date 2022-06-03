import { ApiCall } from "tsrpc";
import { Global } from "../models/Global";
import SearchUtil from "../models/SearchUtil";
import { ReqSearch, ResSearch } from "../shared/protocols/PtlSearch";

export async function ApiSearch(call: ApiCall<ReqSearch, ResSearch>) {

    if(!call.req.content) {
        return call.error('搜索内容不能为空!')
    }
    
    // 记录每一条搜索的内容数据
    await SearchUtil.setSearchContent({ userId: call.currentUser.userId!, searchContent: call.req.content })

    // 先根据内容搜索title 
    let titleRes = await Global.collection('ContentMainClass').find({
        title: {
            $regex: call.req.content
        },
        state: true,
        isDel: false,
    }).project({ title: 1, city: 1, desc: 1, tags: 1, scrollImages: 1 }).toArray()

    if (titleRes.length > 0) {

        let result = await SearchUtil.mainClassToSearchList(titleRes)

        if (result.length > 0) {

            return call.succ({
                list: result.map((v: any) => {
                    return {
                        mainClassId: v._id.toString(),
                        title: v.title,
                        desc: v.desc,
                        scrollImage: v.scrollImages[0],
                        tags: v.tags,
                        city: v.city
                    }
                })
            })

        }

    } else {
        let titleRes = await Global.collection('ContentMainClass').find({
            address: {
                $regex: call.req.content
            },
            state: true,
            isDel: false,

        }).project({ title: 1, city: 1, desc: 1, tags: 1, scrollImages: 1 }).toArray()

        let result = await SearchUtil.mainClassToSearchList(titleRes)

        if (result.length > 0) {

            return call.succ({
                list: result.map((v: any) => {
                    return {
                        mainClassId: v._id.toString(),
                        title: v.title,
                        desc: v.desc,
                        scrollImage: v.scrollImages[0],
                        tags: v.tags,
                        city: v.city
                    }
                })
            })

        } else {
            // TODO tags 搜索
        }

    }

    call.succ({ list: [] })

}