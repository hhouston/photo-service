import { MongoClient } from 'mongodb'
import assert from 'assert'


export default ({ url }) => new MongoClient({
  url
})
