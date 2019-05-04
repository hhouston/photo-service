import { head, isEmpty } from 'ramda'
import jsonwebtoken from 'jsonwebtoken'
import { unauthorized } from 'boom'

export class UserService {
  constructor({
    mongoService,
    stripeService,
    getImageUrl,
    burstCoupon,
    jwtToken,
    genId,
    log
  }) {
    this.mongoService = mongoService
    this.stripeService = stripeService
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

  async purchase ({ email, amount, photoIds, token }) {
    try {
      this.log.info({ email, amount, photoIds }, 'Create Purchase: Start')

      const chargeResp = await this.stripeService.charge({ amount, token })

      const updateResp = await this.mongoService.updateOne({
        query: { email },
        update: { $push: { purchased: photoIds } },
        collection: 'user'
      })

      this.log.info({ email, amount, photoIds }, 'Create Purchase: Success')

    } catch (err) {
      if (err.message == `No such token: ${token}`) {
        return 'Invalid Stripe Token'
      }

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
