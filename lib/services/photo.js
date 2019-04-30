export class PhotoService {
  constructor({
    mongoService,
    s3Service,
    getImageUrl,
    genId,
    log
  }) {
    this.mongoService = mongoService
    this.s3Service = s3Service
    this.getImageUrl = getImageUrl
    this.genId = genId
    this.log = log.child({
      service: 'photo'
    })
  }

  async addPhotos ({ photos }) {
    try {
      this.log.info({ photos }, 'Add Photos: Start')

      const { orgId, teamId, eventId } = photos

      const files = await Promise.all(photos.files)

      for (let photo of files) {
        const id = this.genId()
        const metadata = { id, orgId, teamId, eventId }

        const s3Resp = await this.s3Service.add({ photo, metadata })

        if (s3Resp === true) {
          const dbResp = await this.mongoService.add({
            item: metadata,
            collection: 'photos'
          })

          this.log.info({ photoId: id }, 'Photo Uploaded to s3 AND DB')
        }
      }

      this.log.info('Add Photos: Success')
    } catch (err) {
      this.log.error({ err }, 'Add Photos: Fail')
      throw err
    }
  }

  async getPhotos ({ type }) {
    try {
      this.log.info({ type }, 'Get Photos: Start')

      const photos = await this.mongoService.fetch({
        type,
        collection: 'photos'
      })

      return photos

    } catch (err) {
      this.log.error({ err }, 'Get Photos: Fail')
      throw err
    }
  }

  async getPhotosByTeam ({ teamId }) {
    return [
      {
        id: 'team',
        url: '1'
      },
      {
        id: '3',
        url: '3'
      }
    ]
  }

  async getPhotosByEvent ({ eventId }) {

    return [
      {
        id: 'event',
        url: '1'
      },
      {
        id: '3',
        url: '3'
      }
    ]
  }

}
