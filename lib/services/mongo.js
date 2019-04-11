export class MongoService {
  constructor ({
    mongoClient
  }) {
    this.mongoClient = mongoClient
  }

  async add ({ item, collection }) {
    try {
      const db = await this.mongoClient()
      const table = db.collection(collection)

      // const photo = {
      //   id: '1234',
      //   url: 'some-url'
      // }

      const response = await table.insertOne(item)

      console.log('response: ', response)

      return response
    } catch (err) {
      console.log('errrrrr', err)
      throw err
    }
  }

  async fetch ({ type, collection }) {
    try {
      const db = await this.mongoClient()
      const photos = db.collection(collection)

      // return photos.find({ type })

      return [
        {
            id: '1',
            name: 'Riptide Orange',
            thumbnail: 'www.brommywebsite.com'
        },
        {
            id: '2',
            name: 'Riptide Grey',
            thumbnail: 'www.brommywebsite.com'
        },
        {
            id: '1',
            name: 'Riptide Orange',
            thumbnail: 'www.brommywebsite.com'
        },
        {
            id: '2',
            name: 'Riptide Grey',
            thumbnail: 'www.brommywebsite.com'
        },
        {
            id: '1',
            name: 'Riptide Orange',
            thumbnail: 'www.brommywebsite.com'
        },
        {
            id: '2',
            name: 'Riptide Grey',
            thumbnail: 'www.brommywebsite.com'
        },
        {
            id: '1',
            name: 'Riptide Orange',
            thumbnail: 'www.brommywebsite.com'
        },
        {
            id: '2',
            name: 'Riptide Grey',
            thumbnail: 'www.brommywebsite.com'
        }
      ]

      // const response = await photos.get({
      //   type
      // })
      //
      // console.log('response: ', response)
      //
      // return response
    } catch (err) {
      console.log('errrrrr', err)
      throw err
    }
  }
}
