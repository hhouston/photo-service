import { head, isEmpty } from 'ramda'

export class CouponService {
  constructor({
    mongoService,
    genId,
    log
  }) {
    this.mongoService = mongoService
    this.genId = genId
    this.log = log.child({
      service: 'coupon'
    })
  }

  async add ({ coupon }) {
    try {
      this.log.info({ coupon }, 'Add Coupon: Start')

      const id = this.genId()

      const item = { id, ...coupon }

      const newCoupon = await this.mongoService.add({
        item,
        collection: 'coupon'
      })

      this.log.info({ coupon: item }, 'Add Coupon: Success')

      return newCoupon
    } catch (err) {
      this.log.error({ err }, 'Add Coupon: Fail')
      throw err
    }
  }

  async get () {
    try {
      this.log.info('Get Coupons: Start')

      const coupons = await this.mongoService.fetch({
        collection: 'coupon'
      })

      if (isEmpty(coupons)) this.log.info('Get Coupons: Empty')

      return coupons
    } catch (err) {
      this.log.error({ err }, 'Get Coupons: Fail')
      throw err
    }
  }
}
