export class PhotoService {
  constructor({
    mongoClient,
    mongoService
  }) {
    this.mongoClient = mongoClient
    this.mongoService = mongoService
  }

  async getPhotos ({ type }) {
    const photos = await this.mongoService.fetch({
      type,
      collection: 'photos'
    })

    return photos
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
