import fs from 'fs'
import path from 'path'

import { isNilOrEmpty } from 'ramda'

export class S3Service {
  constructor ({
    s3Client,
    genId,
    log
  }) {
    this.s3Client = s3Client
    this.genId = genId
    this.log = log.child({
      service: 'mongo'
    })
  }

  async add ({ photo, metadata }) {
    try {
      this.log.info({ photo, metadata }, 'Add to s3 Bucket: Start')
      const { createReadStream, mimetype } = photo

      const stream = createReadStream()
      const params = {
        Bucket: 'burst-photos',
        Key: metadata.id,
        Body: stream,
        ContentType: mimetype
      }

      const s3 = await this.s3Client()
      const response = await s3.upload(params).promise()

      console.log('response: ', response)
      return true

    } catch (err) {
      this.log.error({ err }, 'Add to s3 Bucket: Fail')
      return false
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
