export class PhotoService {
  constructor ({
    mongoClient
  }) {
    this.mongoClient = mongoClient({ collection: 'test'})
  }

  async getFeatured () {
    return [
      {
        id: 'featured',
        url: '1'
      },
      {
        id: '3',
        url: '3'
      }
    ]
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

  async getPhotosByEvent ({ eventId, mongoClient }) {
    // console.log('mongo client', this.mongoClient )
    // console.log('mongo client', mongoClient({ collection: 'test'}) )
    // const resp = await this.mongoService.addPhoto()
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
