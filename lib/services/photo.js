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

  async addPhotos ({ photos }) {
    try {
      this.log.info({ photos }, 'Add Photos: Start')

      const s3Resp = await this.s3Service.add(photos)

      console.log('s3 resp: ', s3Resp);
      const dbResp = await this.mongoService.add({
          item: photos,
          collection: 'photos'
        })

      console.log('db resp: ', dbResp);

      } catch (err) {
        this.log.error({ err }, 'Add Photo: Start')
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
