import { isNil } from 'ramda'

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
      this.log.info({ item, collection }, 'Add to Database: Start')

      const db = await this.mongoClient()
      const table = db.collection(collection)

      const resp = await table.insertOne(item)

      this.log.info({ resp }, 'Add to Database: Success')
      return 'success'
    } catch (err) {
      this.log.error({ err }, 'Add to Database: Fail')
      throw err
    }
  }

  async fetch ({ query = null, collection }) {
    try {
      this.log.info({ query, collection }, 'Fetch from Database: Start')

      const db = await this.mongoClient()
      const table = db.collection(collection)

      const cursor = isNil(query)
        ? await table.find()
        : await table.find(query)

      const items = await cursor.toArray()
      console.log('items: ', items)
      return items
    } catch (err) {
      this.log.error({ err }, 'Fetch from Database: Fail')
      throw err
    }
  }

  // async update ({ query, update, collection }) {
  //   try {
  //     this.log.info({ update, collection }, 'Update Item: Start')
  //
  //     const db = await this.mongoClient()
  //     const table = db.collection(collection)
  //
  //     const cursor = isNil(query)
  //       ? await table.find()
  //       : await table.find(query)
  //
  //     const items = await cursor.toArray()
  //
  //     return items
  //   } catch (err) {
  //     this.log.error({ err }, 'Fetch from Database: Fail')
  //     throw err
  //   }
  // }
}
