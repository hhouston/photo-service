import Stripe from 'stripe'

export class StripeService {
  constructor({
    apiKey,
    log
  }) {
    this.stripe = Stripe(apiKey)
    this.log = log.child({
      service: 'stripe'
    })
  }

  async charge ({ tokenId }) {
      const { status } = await this.stripe.charges.create({
        amount: 200,
        currency: 'usd',
        description: 'Example charge',
        source: tokenId,
      })
    console.log(status)
    return 'succeeded'
  }
}
