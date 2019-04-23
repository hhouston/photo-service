export class PhotoService {
  constructor({
    mongoService,
    getImageUrl,
    log
  }) {
    this.mongoService = mongoService
    this.getImageUrl = getImageUrl
    this.log = log.child({
      service: 'photo'
    })
  }

  async getPhotos ({ type }) {
    try {
      this.log.info({ type }, 'Get Photos: Start')

      const imageUrl = this.getImageUrl({ path: 'hunter' })
      // const imageUrl = getImageUrl()
      console.log('----------', imageUrl)
      // this.cloudfrontClient()
      // const photos = await this.mongoService.fetch({
      //   type,
      //   collection: 'photos'
      // })
      //
      // return photos

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
    return this.mongoService.add({
      item: photo,
      collection: 'photos'
    })
  }
}
