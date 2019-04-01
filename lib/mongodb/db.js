import { MongoClient } from 'mongodb'
import assert from 'assert'

export class MongoDB {

  async start () {
    const url = 'mongodb://localhost:27017'

    // Database Name
    const dbName = 'test'

    // Create a new MongoClient
    const client = new MongoClient(url)

    // Use connect method to connect to the Server
    client.connect((err) => {
      assert.equal(null, err)
      console.log('Connected successfully to server')

      const db = client.db(dbName)
      const collection = db.collection('photos')

      console.log('db', db);
      client.close()
    })
  }

  async addPhoto () {

  }
}
