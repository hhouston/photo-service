export class PhotoService {
  constructor({
    mongoService,
    s3Service,
    getImageUrl,
    log
  }) {
    this.mongoService = mongoService
    this.s3Service = s3Service
    this.getImageUrl = getImageUrl
    this.log = log.child({
      service: 'photo'
    })
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

  async addPhoto ({ photo }) {
    try {
      this.log.info({ photo }, 'Add Photo: Start')

      const dbResp = await this.s3Service.add({
        item: photo
      })

      // const dbResp = await this.mongoService.add({
      //   item: photo,
      //   collection: 'photos'
      // })


    } catch (err) {
      this.log.error({ err }, 'Add Photo: Start')
      throw err
    }
  }
}
