import { MongoClient } from 'mongodb'

export const createMongoClient = ({
  url
}) => {
  let db
  return async () => {
    if (db) return db

    const auth = { user: 'burst', password: '3qxa8Dz7wwCZazxx' }
    const client = await MongoClient.connect(url, { useNewUrlParser: true, auth })
    db = client.db('burst-photos')

    return db
  }
}
