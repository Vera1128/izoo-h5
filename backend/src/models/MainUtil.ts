import { populerItem } from "../shared/protocols/Main/PtlGetPopulerData";
import { Global } from "./Global";

export class MainUtil {

  /**
   * 处理内容数据
   */
  static async mainClassDataEvent(data: any, arr: populerItem[]) {

    // find tags
    for (let i = 0;i < data.length;i++) {
      const item = data[i];

      for (let j = 0;j < item.tags.length;j++) {
        const tagsId = item.tags[j];
        let result = await Global.collection('Tags').findOne({
          _id: tagsId
        })
        item.tags[j] = result ? result.tag : ''
      }

      let subRes = await Global.collection('ContentSubClass').findOne({
        mainClassId: item._id.toString()
      })

      data[i]['totals'] = subRes ? subRes.subClassList.length : 0

      let duration = await Global.collection('ContentValueClass').aggregate([
        {
          $match: {
            mainClassId: item._id.toString()
          }
        },
        {
          $group: {
            _id: "$mainClassId",
            sum: {
              $sum: '$duration'
            }
          }
        }
      ]).toArray()

      arr.push({
        mainClassId: item._id.toString(),
        title: item.title,
        desc: item.desc,
        tags: item.tags,
        duration: duration.length > 0 ? duration[0].sum : 0,
        totals: item.totals,
        scrollImage: item.scrollImages.length > 0 ? item.scrollImages[0] : ''
      })

    }

    return arr

  }

  static async mainClassToTags(data: any) {

    for (let i = 0;i < data.tags.length;i++) {
      const tagsId = data.tags[i];
      let result = await Global.collection('Tags').findOne({
        _id: tagsId
      })
      data.tags[i] = result ? result.tag : ''
    }

    data['nums'] = data.avgAmount ? 2 : 0

    return data

  }


}