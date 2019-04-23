import { MongoClient } from 'mongodb'

export const createMongoClient = ({
  url
}) => {
  let db
  return async () => {
    if (db) return db
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    db = client.db('burst-photos')

    return db
  }
}
