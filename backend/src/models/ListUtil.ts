import { ResTypeData } from "../shared/protocols/List/PtlTypeData";
import { Global } from "./Global";


export class ListUtil {

  /**
   * list info
   */
  static async listDataEvent(data: any, arr: ResTypeData['list']) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      for (let j = 0; j < item.tags.length; j++) {
        const tagsId = item.tags[j];

        let result = await Global.collection('Tags').findOne({
          _id: tagsId
        })

        item.tags[j] = result && result.tag ? result.tag : ''

      }

    }

    arr = data.map((item: any) => {

      return {
        mainClassId: item._id.toString(),
        title: item.title,
        scrollImage: item.scrollImages.length >= 1 ? item.scrollImages[0] : '',
        tags: item.tags,
        city: item.city,
        desc: item.desc
      }
    })

    return arr
  }



}