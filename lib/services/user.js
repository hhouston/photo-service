import { head, isEmpty } from 'ramda'
import jsonwebtoken from 'jsonwebtoken'

export class UserService {
  constructor({
    mongoService,
    s3Service,
    getImageUrl,
    burstCoupon,
    jwtToken,
    genId,
    log
  }) {
    this.mongoService = mongoService
    this.s3Service = s3Service
    this.getImageUrl = getImageUrl
    this.burstCoupon = burstCoupon
    this.jwtToken = jwtToken
    this.genId = genId
    this.log = log.child({
      service: 'photo'
    })
  }

  async login ({ email, coupon }) {
    try {
      this.log.info({ email, coupon }, 'Verify Coupon: Start')

      const valid = this.burstCoupon === coupon

      if (!valid) {
        throw new Error('Incorrect credentials')
      }

      await this.saveUser({ email })

      const token = jsonwebtoken.sign({ email }, this.jwtToken, { expiresIn: '10y' })
      return token
    } catch (err) {
      this.log.error({ err }, 'Verify Coupon: Fail')
      throw err
    }
  }

  async saveUser ({ email }) {
    try {
      this.log.info('Save User: Start')

      const user = await this.mongoService.fetch({
        query: { email },
        collection: 'user'
      })

      if (!isEmpty(user)) {
        this.log.info({ email }, 'Save User: User Exists')
        return
      }

      const userResp = await this.mongoService.add({
        item: { id: this.genId(), email },
        collection: 'user'
      })

      this.log.info({ email }, 'Save User: Success')

    } catch (err) {
      this.log.error({ err }, 'Save User: Fail')
      throw err

    }
  }

  async purchase ({ email, photos, token }) {
    try {
      this.log.info({ email }, 'Create Purchase: Start')


    } catch (err) {
      this.log.error({ err }, 'Create Purchase: Fail')
      throw err
    }
  }

  async emailUser ({ ids }) {
    try {
      this.log.info({ ids }, 'Get Photos By Ids: Start')

      const photos = ids.map(async id => {
        const photo = await this.mongoService.fetch({
          query: { id },
          collection: 'photos'
        })

        console.log('photo: ', photo);
        return head(photo)
      })

      return photos

    } catch (err) {
      this.log.error({ err }, 'Get Photos By Ids: Fail')
      throw err
    }
  }

}
