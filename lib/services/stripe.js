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

  async charge ({ amount, token }) {
      const { status } = await this.stripe.charges.create({
        amount: amount * 100,
        currency: 'usd',
        description: 'Photo Purchase',
        source: token,
      })

    return status
  }
}
