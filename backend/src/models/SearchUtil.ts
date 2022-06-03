import { Global } from "./Global";

export default class SearchUtil {

  static async setSearchContent(params: { userId: number, searchContent: string }) {

    Global.collection('SearchStat').updateOne({
      type: 'self',
      content: params.searchContent,
      'create.userId': params.userId,
    }, {
      $set: {
        'create.updateTime': new Date()
      },
      $setOnInsert: {
        'create.createTime': new Date(),
      }
    }, { upsert: true }).then((res) => {
      Global.collection('SearchStat').updateOne({
        type: 'system',
        content: params.searchContent,
      }, {
        $inc: {
          tiemes: 1
        }
      }, { upsert: true })
    })

  }


  static async mainClassToSearchList(data: any) {

    for (let i = 0;i < data.length;i++) {
      const item = data[i];

      for (let j = 0;j < item.tags.length;j++) {
        const tagsId = item.tags[j];

        let result = await Global.collection('Tags').find({
          _id: tagsId
        }).next()

        item.tags[j] = result ? result.tag : ''

      }

    }

    return data

  }

}