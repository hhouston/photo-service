export class PhotoService {
  async getPhotosByEvent ({ eventId }) {
    return [
      {
        id: '1',
        url: '1'
      },
      {
        id: '3',
        url: '3'
      }
    ]
  }
}
