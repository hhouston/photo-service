import { isNilOrEmpty } from 'ramda'

export class MongoService {
  constructor ({
    mongoClient,
    log
  }) {
    this.mongoClient = mongoClient
    this.log = log.child({
      service: 'mongo'
    })
  }

  async add ({ item, collection }) {
    try {
      this.log.info({ item, colleciton }, 'Add to Database: Start')

      const db = await this.mongoClient()
      const table = db.collection(collection)

      const response = await table.insertOne(item)

      console.log('response: ', response)

      return response
    } catch (err) {
      this.log.error({ item, colleciton }, 'Add to Database: Fail')
      throw err
    }
  }

  async fetch ({ type, collection }) {
    try {
      this.log.info({ item, collection }, 'Fetch from Database: Start')

      // find photos by all, teamId, eventId, playerId

      const db = await this.mongoClient()
      const table = db.collection(collection)

      const data = isNilOrEmpty(type)
        ? await table.find()
        : await table.find(type)

      // return [
      //   {
      //       id: '1',
      //       name: 'Riptide Orange',
      //       thumbnail: 'www.brommywebsite.com'
      //   },
      //   {
      //       id: '2',
      //       name: 'Riptide Grey',
      //       thumbnail: 'www.brommywebsite.com'
      //   }
      // ]
    } catch (err) {
      this.log.error({ item, colleciton }, 'Fetch from Database: Fail')
      throw err
    }
  }
}
