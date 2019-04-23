export class StripeService {
  constructor({
    log
  }) {
    this.log = log.child({
      service: 'stripe'
    })
  }

  async post () {
    this.log.info('STRIPE POST')
  }
}
