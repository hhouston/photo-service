import fs from 'fs'
import path from 'path'

import { isNilOrEmpty } from 'ramda'

export class S3Service {
  constructor ({
    s3Client,
    log
  }) {
    this.s3Client = s3Client
    this.log = log.child({
      service: 'mongo'
    })
  }

  async add (data) {
    try {
      this.log.info({ data }, 'Add to s3 Bucket: Start')
      return
      // const fileName = 'rick-ross-hustle-icon.jpg'
      // const file = await fs.readFileSync(
      //   path.join(__dirname, '..', '..', 'tmp', fileName),
      //   { encoding: 'utf8' }
      // )
      //
      // console.log('file: ', file)

      const params = {
        Bucket: 'burst-photos',
        Key: 'rick-ross-hustle-icon2.jpg',
        Body: JSON.stringify(data.photo[0], null, 2)
      }

      const s3 = await this.s3Client()
      // const response = await s3.upload(params)

      const response = await s3.upload(params, function(s3Err, data) {
          if (s3Err) throw s3Err
          console.log(`File uploaded successfully at ${data.Location}`)
      });
      // console.log('response: ', response)

      return response
    } catch (err) {
      this.log.error({ err }, 'Add to Database: Fail')
      throw err
    }
  }

  async fetch ({ type, collection }) {
    try {
      this.log.info({ item, collection }, 'Fetch from Database: Start')

      // find photos by all, teamId, eventId, playerId

      const db = await this.s3Client()
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
      this.log.error({ err }, 'Fetch from Database: Fail')
      throw err
    }
  }
}
