export class MongoService {
  constructor ({
    mongoClient
  }) {
    this.mongoClient = mongoClient
  }

  async add ({ collection }) {
    try {
      const db = await this.mongoClient()
      const photos = db.collection(collection)

      const photo = {
        id: '1234',
        url: 'some-url'
      }

      const response = await photos.insertOne(photo)

      console.log('response: ', response)

      return 'test'
    } catch (err) {
      console.log('errrrrr', err)
      throw err
    }
  }

  async fetch ({ type, collection }) {
    try {
      const db = await this.mongoClient()
      const photos = db.collection(collection)

      return [
        {
          id: '1',
          url: 'featured-url'
        },
        { id: '2',
          url: 'featured-url'
        },
        {
          id: '3',
          url: 'featured-url'
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
