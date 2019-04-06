export class MongoService {
  constructor ({
    mongoClient
  }) {
    this.mongoClient = mongoClient
  }

  async addPhoto (photo) {
    try {
      console.log('photo::::::::', photo);
      console.log('mongo client: ', this.mongoClient);
      // const response = await this.mongoClient.saveItem({
      //   item: photo,
      //   tableName = 'photos'
      // })
      //
      // console.log('response: ', response)

      return 'test'
    } catch (err) {
      console.log('errrrrr', err)
      throw err
    }
  }
}
