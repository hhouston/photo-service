import { MongoClient } from 'mongodb'
import assert from 'assert'


export const createMongoClient = ({
  url
}) => async ({
  mongoUrl,
  collection
}) => {
  const url = 'mongodb://localhost:27017/'
  console.log('aaaaa', );
      let client = await MongoClient.connect(url,
          { useNewUrlParser: true });

      let db = client.db('dbName');

      return client
      //try {
      //    const res = await db.collection("collectionName").updateOne({
      //        "someKey": someValue
      //    }, { $set: someObj }, { upsert: true });
      //
      //    console.log(`res => ${JSON.stringify(res)}`);
      // }
      // finally {
      //     client.close();
      // }
    }
      // .catch(err => console.error(err));

   // async connect () {
    // const client = MongoClient.connect(url, (err, db) => {
    //   console.log('connect to test');
    //   if (err) throw err;
    //   const dbo = db.db('test');
    //   // return dbo
    //   // dbo.createCollection('photos', (err, res) => {
    //   //   if (err) throw err;
    //   //   console.log('Collection created!')
    //   //   db.close()
    //   // })
    // })
    //
    // console.log('cleint: ', client);
    //
    // return client
  // }
  // console.log('HERE IS MONGO CLIENT');
  // return MongoClient.connect(url, (err, db) => {
  //   console.log('connect to test');
  //   if (err) throw err;
  //   const dbo = db.db('test');
  //   return dbo
  //   dbo.createCollection('photos', (err, res) => {
  //     if (err) throw err;
  //     console.log('Collection created!')
  //     db.close()
  //   })
  // })
