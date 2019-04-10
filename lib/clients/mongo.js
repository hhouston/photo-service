import { MongoClient } from 'mongodb'
import assert from 'assert'


export const createMongoClient = ({
  url
}) => {
  let db
  return async () => {
    if (db) return db
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    db = client.db('hunter');

    return db
  }
}
